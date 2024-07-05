import { sendMail } from "@/actions/mail";
import { NextResponse } from "next/server";

export async function POST(req) {
    let body = await req.formData();

    try {
        await sendMail(
            "Contact : " + body.get("name"),
            "officialkazeem.id@gmail.com",
            `Got email from ${body.get("email")} as ${body.get(
                "name"
            )} \nMessage: ${body.get("message")}`
        );
        return Response.json({ status: "success", msg: "berhasil" });
    } catch (err) {
        return Response.json({ status: "fail", msg: "err" });
    }
}
