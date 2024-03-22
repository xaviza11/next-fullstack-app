import { signupService } from ".././../src/app/api/auth/signup/service";
import User from "../../src/models/user";

describe('POST /api/auth/signup', () => {
  it('should register a new user successfully', async () => {
    const userData = {
      fullname: 'Test User',
      email: 'testuser@example.com',
      password: 'abc1Acdvfbg!'
    };

    const response = await signupService(userData)

    expect(response.status).toBe(201); 
    expect(response.data.fullname).toBe(userData.fullname)
    expect(response.data.email).toBe(userData.email)
    expect(typeof response.data.createdAt).toBe('object')
    expect(typeof response.data.updatedAt).toBe('object')

    const userInDb = await User.findOne({ email: userData.email }).select('+password')

    expect(userInDb).not.toBeNull();
    expect(userInDb.email).toBe(userData.email);
    expect(userInDb.password).toBeDefined();
    expect(userInDb.fullname).toBe(userData.fullname);
    expect(typeof userInDb.updatedAt).toBe('object')
    expect(typeof userInDb.createdAt).toBe('object')
  });
});

it('throw error when user already exists', async  () => {
  const userData = {
    fullname: 'Test User',
    email: 'testuser@example.com',
    password: 'abc1Acdvfbg!'
  };
  await expect(signupService(userData)).rejects.toEqual({ message: "Email already exists", status: 409 });
})

it('throw error when fullname not have at least two characters', async  () => {
  const userData = {
    fullname: '',
    email: 'testuser@example.com',
    password: 'abc1Acdvfbg!'
  };
  await expect(signupService(userData)).rejects.toEqual({ message: "Name must have at least two characters", status: 400 });
})

it('throw error when email not valid', async  () => {
  const userData = {
    fullname: 'test name',
    email: 'testuser@example.',
    password: 'abc1Acdvfbg!'
  };
  await expect(signupService(userData)).rejects.toEqual({ message: "Invalid email format. Please enter a valid email address.", status: 400 });
})

it('throw error when password length is less than 8', async () => {
  const userData = {
    fullname: 'test name',
    email: 'testuser@example.com',
    password: 'abc1A'
  };
  await expect(signupService(userData)).rejects.toEqual({ message: "Password must be at least 8 characters long.", status: 400 });
})

it('throw error when password not have at least one lowerCase letter', async () => {
  const userData = {
    fullname: 'test name',
    email: 'testuser@example.com',
    password: '1AGJHGKJGAS'
  };
  await expect(signupService(userData)).rejects.toEqual({ message:"Password must contain at least one lowercase letter.", status: 400 });
})

it('throw error when password not have at least one uppercase letter', async () => {
  const userData = {
    fullname: 'test name',
    email: 'testuser@example.com',
    password: '1asdfasdfadf'
  };
  await expect(signupService(userData)).rejects.toEqual({ message:"Password must contain at least one uppercase letter.", status: 400 });
})

it('throw error when password not have at least one number', async () => {
  const userData = {
    fullname: 'test name',
    email: 'testuser@example.com',
    password: 'Aasdfasdfadf'
  };
  await expect(signupService(userData)).rejects.toEqual({ message:"Password must contain at least one digit.", status: 400 });
})

afterAll(async () => {
  await User.deleteMany();
});


