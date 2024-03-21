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

afterAll(async () => {
  await User.deleteMany();
});


