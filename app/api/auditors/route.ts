import { NextResponse } from "next/server";
import { google } from "googleapis";

const SPREADSHEET_ID = "12RSw7jLm1w6rmH2vcnrEA0mtsZ_6YYTOVgiuykvhT9o";
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

interface Cache {
  data: {
    sheets: Record<string, SheetData[] | string[]>;
    disclaimer: string;
  };
  timestamp: number;
}

interface SheetData {
  company?: string;
  price?: string;
  timeframe?: string;
  [key: string]: string | undefined;
}

let cache: Cache | null = null;

export async function GET() {
  try {
    const now = Date.now();

    // Check if cached data is still valid
    if (cache && now - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json(cache.data);
    }

    const sheets = google.sheets({
      version: "v4",
      auth: process.env.GOOGLE_SHEETS_API_KEY,
    });

    // Get the spreadsheet metadata to retrieve sheet names
    const metadataResponse = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
      key: process.env.GOOGLE_SHEETS_API_KEY,
    });

    const sheetNames: string[] =
      metadataResponse.data.sheets?.map(
        (sheet) => sheet.properties?.title || ""
      ) || [];

    const allSheets: Record<string, SheetData[] | string[]> = {};
    let disclaimer = "";

    // Iterate through each sheet and get the data
    for (const sheetName of sheetNames) {
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A:Z`,
        key: process.env.GOOGLE_SHEETS_API_KEY,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        continue;
      }

      // Set disclaimer from the first row of any sheet
      if (rows[0] && rows[0][0]) {
        disclaimer = rows[0][0];
      }

      if (sheetName === "Summary") {
        // Special handling for Summary sheet
        allSheets[sheetName] = rows
          .slice(2) // Skip the disclaimer row
          .filter((row) => row.length > 0 && row[0]) // Ensure row has content
          .map((row) => ({
            company: row[0] || "",
            price: row[1] || "",
            timeframe: row[2] || "",
          }));
      } else if (sheetName === "Other Resources") {
        // Handle Other Resources sheet
        allSheets[sheetName] = rows
          .slice(1)
          .filter((row) => row.length > 0 && row[0])
          .map((row) => row[0]);
      } else {
        // Handle all other sheets
        const headers = rows[1] || [];
        allSheets[sheetName] = rows
          .slice(2)
          .filter((row) => row.length > 0)
          .map((row) => {
            const entry: SheetData = {};
            headers.forEach((header: string, index: number) => {
              if (header) {
                entry[header] = row[index] || "";
              }
            });
            return entry;
          });
      }
    }

    const responseData = {
      sheets: allSheets,
      disclaimer,
    };

    // Update the cache
    cache = {
      data: responseData,
      timestamp: now,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error processing Google Sheet:", error);
    return NextResponse.json(
      { error: "Failed to process Google Sheet" },
      { status: 500 }
    );
  }
}
