# Shopify Store Open Order Exporter

This Node.js application fetches data from a Shopify store API and exports it to a CSV file.

Shopify's graphQL API is used.

This is a basic script built for a friend.

## Prerequisites

Before running this application, if you do not have them, you need to install:

### Windows
1. Node.js (Download and install from [nodejs.org](https://nodejs.org/))
2. Git (Download and install from [git-scm.com](https://git-scm.com/download/win))

### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm git

# Fedora
sudo dnf install nodejs npm git
```

## Installation

1. Clone this repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Rename `.env.example` to `.env`
   - Fill in the required values in `.env`:
     - Shopify API tokens
     - Store URL
     - Output directory path for CSV

## Running the Application

Once everything is set up, run the application with:

```bash
npm start
```

The CSV file will be generated in the output directory specified in your `.env` file.

## Troubleshooting

If you encounter any issues:
1. Ensure all environment variables in `.env` are correctly set
2. Check that the output directory exists and is writable
3. Verify your internet connection

## License

MIT License
