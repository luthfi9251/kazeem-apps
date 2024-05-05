import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    let usersData = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            nama_lengkap: true,
            aktif: true,
        },
    });
    return NextResponse.json({ data: usersData });
}
