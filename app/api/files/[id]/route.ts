import { NextRequest, NextResponse } from "next/server";

/**
 * Gets a file of given id from the storage
 * @returns Response
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  return NextResponse.json({
    id,
  });
}

/**
 * Deletes a file from the storage
 * @returns Response
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({});
}
