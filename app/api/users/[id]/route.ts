import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnects';
import User from '@/models/user';

type Context = {
  params: Promise<{ id: string }>;
};

// ✅ GET method
export async function GET(request: Request, context: Context) {
  try {
   const params = await context.params;
    const { id } = params;
    await dbConnect();
    
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// ✅ PUT method
export async function PUT(request: Request, context: Context) {
  try {
   const params = await context.params;
    const { id } = params;
    const data = await request.json();
    await dbConnect();

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// ✅ DELETE method
export async function DELETE(request: Request, context: Context) {
  try {
   const params = await context.params;
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
    }

    await dbConnect();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
