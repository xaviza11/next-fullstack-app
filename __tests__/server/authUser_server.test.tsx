import { authorize } from "../../src/app/api/auth/[...nextauth]/authorize";
import User from "../../src/models/user";
import { signupService } from ".././../src/app/api/auth/signup/service";
export interface AuthResponse {
    status: number;
    message: string;
    userFound?: {
      fullname: string;
      email: string;
    };
  }

describe('auth a user', () => {
    it('should auth a user', async () => {
      const userData = {
        fullname: 'Test User',
        email: 'testuser2@example2.com',
        password: 'abc1Acdvfbg!'
      };

      await signupService(userData)

      const response:AuthResponse = await authorize({email: userData.email, password: userData.password})

      expect(response.userFound).toBeTruthy();
      expect(response?.userFound?.email).toBe(userData.email)
      expect(response?.userFound?.fullname).toBe(userData.fullname)
    });
  });

  
it('throw error when user not found', async  () => {
    const userData = {
      fullname: 'Test User',
      email: 'asdfasdfasd@example2.com',
      password: 'abc1Acdvfbg!'
    };
    await expect(authorize(userData)).rejects.toEqual({ message:  'User not exist', status: 400 });
  })

  it('throw error when email not valid', async  () => {
    const userData = {
      fullname: 'test name',
      email: 'testuser@example.',
      password: 'abc1Acdvfbg!'
    };
    await expect(authorize(userData)).rejects.toEqual({ message: "Invalid email format. Please enter a valid email address.", status: 400 });
  })
  
  it('throw error when password length is less than 8', async () => {
    const userData = {
      fullname: 'test name',
      email: 'testuser@example.com',
      password: 'abc1A'
    };
    await expect(authorize(userData)).rejects.toEqual({ message: "Password must be at least 8 characters long.", status: 400 });
  })
  
  it('throw error when password not have at least one lowerCase letter', async () => {
    const userData = {
      fullname: 'test name',
      email: 'testuser@example.com',
      password: '1AGJHGKJGAS'
    };
    await expect(authorize(userData)).rejects.toEqual({ message:"Password must contain at least one lowercase letter.", status: 400 });
  })
  
  it('throw error when password not have at least one uppercase letter', async () => {
    const userData = {
      fullname: 'test name',
      email: 'testuser@example.com',
      password: '1asdfasdfadf'
    };
    await expect(authorize(userData)).rejects.toEqual({ message:"Password must contain at least one uppercase letter.", status: 400 });
  })
  
  it('throw error when password not have at least one number', async () => {
    const userData = {
      fullname: 'test name',
      email: 'testuser@example.com',
      password: 'Aasdfasdfadf'
    };
    await expect(authorize(userData)).rejects.toEqual({ message:"Password must contain at least one digit.", status: 400 });
  })

  afterAll(async () => {
    await User.deleteMany();
  });