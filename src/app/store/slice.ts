"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  verifytokenuserdata: object;
}

interface SignupUser {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

interface ChangePassword {
  email: string;
  password: string;
}

//////////////////////////   SignUp Account        ////////////////////////

export const registerUser = createAsyncThunk(
  "registerUser",
  async (signupUser: SignupUser, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupUser),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }

      return true;
    } catch (err: any) {
      return rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

//////////////////////////   reset password        ////////////////////////

export const changepassword = createAsyncThunk(
  "changepassword",
  async (changepassword: ChangePassword, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changepassword),
      });

      const data = await res.json();
      
      if (!res.ok) {
     return   rejectWithValue(data.message || "forget-password failed");
      }
      else {
        return data
      }
    } catch (error) {
      console.error("Error forget-password user:", error);
    return  rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

//////////////////////////   verify token       ////////////////////////

export const verifytoken = createAsyncThunk(
  "verifytoken",
  async (token: any, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) {
      return  rejectWithValue(data.message || "forget-password failed");
      } else {
        return data.message;
      }
    } catch (error) {
      console.error("Error forget-password user:", error);
    return  rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

//////////////////////////   forget password       ////////////////////////

export const forgetpassword = createAsyncThunk(
  "forgetpassword",
  async (forgetpassword: { email: string }, { rejectWithValue }) => {    
    try {
      const res = await fetch(`/api/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgetpassword),
      });

      const data = await res.json();
      if (!res.ok) {
      return  rejectWithValue(data.message || "forget-password failed");
      }
    } catch (error) {
      console.error("Error forget-password user:", error);
    return rejectWithValue("Something went wrong. Please try again.");
    }
  }
);


const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  verifytokenuserdata: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    //////////////////////////   SignUp builder        ////////////////////////

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Registration failed";
      });

    //////////////////////////   Reset Password   builder        ////////////////////////

    builder
      .addCase(changepassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changepassword.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(changepassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "change Password failed";    
      });

    //////////////////////////   verify token   builder        ////////////////////////

    builder
      .addCase(verifytoken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifytoken.fulfilled, (state, action) => {
        state.loading = false;
        state.verifytokenuserdata = action.payload;
      })
      .addCase(verifytoken.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "verify token failed";
      });

    //////////////////////////   Reset Password   builder        ////////////////////////

    builder
      .addCase(forgetpassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetpassword.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(forgetpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Forget Password failed";
      });
  },
});

export const authreducer = authSlice.reducer;
