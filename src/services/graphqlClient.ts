import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION, Session } from "@shopify/shopify-api";
import { config } from "../config/config.js";

interface OrderEdge {
  cursor: string;
  node: {
    id: string;
    lineItems: {
      edges: LineItem[];
    };
  };
}

interface GraphQLResponse {
  data?: {
    orders: {
      edges: OrderEdge[];
      pageInfo: {
        hasNextPage: boolean;
      };
    };
  };
}

interface LineItem {
  node: {
    title: string;
    sku: string | null;
    quantity: number;
  };
}

interface OrderData {
  order_id: string;
  product_description: string;
  sku: string;
  quantity: number;
}

const shopify = shopifyApi({
  apiKey: config.apiKey,
  apiSecretKey: config.apiSecretKey,
  scopes: ["read_orders"],
  hostName: config.shopUrl,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
});

const session = new Session({
  id: "offline_session_for_" + config.shopUrl,
  shop: config.shopUrl,
  state: "offline",
  isOnline: false,
  accessToken: config.accessToken,
  scope: "read_orders",
});

const ORDERS_QUERY = `
  query($cursor: String) {
    orders(first: 250, after: $cursor, query: "status:OPEN") {
      edges {
        cursor
        node {
          id
          lineItems(first: 50) {
            edges {
              node {
                title
                sku
                quantity
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export async function getOpenOrdersGraphQL(): Promise<OrderData[]> {
  const client = new shopify.clients.Graphql({ session });

  try {
    let allOrders: OrderEdge[] = [];
    let cursor = null;
    let hasNextPage = true;

    while (hasNextPage) {
      const response: GraphQLResponse = await client.request(ORDERS_QUERY, {
        variables: { cursor },
      });

      const orders: OrderEdge[] = response.data?.orders.edges ?? [];
      allOrders = allOrders.concat(orders);

      hasNextPage = response.data?.orders.pageInfo.hasNextPage ?? false;
      cursor = orders[orders.length - 1]?.cursor;

      console.log(
        `Fetched ${orders.length} orders` + hasNextPage ? "..." : ".",
      );
    }

    return allOrders.flatMap((order: any) =>
      order.node.lineItems.edges.map((item: LineItem) => ({
        order_id: order.node.id,
        product_description: item.node.title,
        sku: item.node.sku || "N/A",
        quantity: item.node.quantity,
      })),
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
