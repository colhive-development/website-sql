import { db } from "@/database";
import { company } from "@/database/schema/users";
import { genSalt, hash } from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const salt = await genSalt(17);
    const hashPassword = await hash(password, salt);

    const newCompany = await db.insert(company).values({
      name,
      email,
      password: hashPassword,
      emailVerified: true,
    });

    return NextResponse.json(
      {
        message: "New Company Registered",
        value: newCompany,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.log(error.message);
    if (
      error.message ==
      'duplicate key value violates unique constraint "company_email_unique"'
    ) {
      return NextResponse.json(
        {
          message: "Account already exists",
          value: null,
        },
        { status: 409 },
      );
    }
    return NextResponse.json(
      {
        message: "Internal Server Error",
        value: null,
      },
      { status: 500 },
    );
  }
}
