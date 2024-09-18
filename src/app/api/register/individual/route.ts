import { db } from "@/database";
import { users } from "@/database/schema/users";
import { genSalt, hash } from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, companyId } = await request.json();

    const salt = await genSalt(17);
    const hashPassword = await hash(password, salt);

    const newCompany = await db.insert(users).values({
      name,
      email,
      password: hashPassword,
      role,
      companyId,
      emailVerified: true,
    });

    return NextResponse.json(
      {
        message: "New Individual Registered",
        value: newCompany,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.log(error.message);
    if (
      error.messgae ==
      'insert or update on table "user" violates foreign key constraint "user_company_id_company_id_fk"'
    ) {
      return NextResponse.json(
        {
          message: "Invalid Company References",
          value: null,
        },
        { status: 409 },
      );
    }
    if (
      error.message ==
      'duplicate key value violates unique constraint "user_email_unique"'
    ) {
      return NextResponse.json(
        {
          message: "Individual registered already",
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
