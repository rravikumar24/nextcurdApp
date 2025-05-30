import { NextResponse } from 'next/server';
import User from '@/models/user';
import { dbConnect } from '@/lib/dbConnects';



export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const body = await req.json();

    // Check if email already exists
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    // Create new user
    const newUser = await User.create(body);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};