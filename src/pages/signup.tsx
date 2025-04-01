import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { months, countries } from "../exports/index";

// Helper functions for password strength
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // Complexity checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  if (/[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 1;

  return Math.min(strength, 4);
};

const getStrengthColor = (strength: number): string => {
  const colors = [
    "bg-red-500", // 0 (very weak)
    "bg-red-500", // 1 (weak)
    "bg-yellow-500", // 2 (medium)
    "bg-orange-500", // 3 (strong)
    "bg-green-500", // 4 (very strong)
  ];
  return colors[Math.min(strength, colors.length - 1)];
};

const getStrengthLabel = (strength: number): string => {
  const labels = ["Very weak", "Weak", "Medium", "Strong", "Very strong"];
  return labels[Math.min(strength, labels.length - 1)];
};

// Prevent copy/paste for passwords
const handlePaste = (e: React.ClipboardEvent) => {
  e.preventDefault();
  return false;
};

const Signup = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1924 },
    (_, i) => currentYear - i
  );

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmBeforePasswordError, setConfirmBeforePasswordError] =
    useState("");
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [birthMonthError, setBirthMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [countryError, setCountryError] = useState("");

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    casing: false,
    numberOrSymbol: false,
    noEmail: true,
  });

  // Validation effects
  useEffect(() => {
    const timer = setTimeout(() => {
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setEmailError("Please enter a valid email address.");
        } else {
          setEmailError("");
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  useEffect(() => {
    if (password) {
      setPasswordRules({
        length: password.length >= 8,
        casing: /[a-z]/.test(password) && /[A-Z]/.test(password),
        numberOrSymbol: /[\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
        noEmail: email
          ? !password.toLowerCase().includes(email.toLowerCase())
          : true,
      });
    }
  }, [password, email]);

  // Validation functions
  const validateStep1 = () => {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Please enter an email address.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Please enter a password.");
      valid = false;
    } else if (
      !passwordRules.length ||
      !passwordRules.casing ||
      !passwordRules.numberOrSymbol ||
      !passwordRules.noEmail
    ) {
      setPasswordError("Password doesn't meet all requirements.");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    return valid;
  };

  const validateStep2 = () => {
    let valid = true;

    if (!firstName.trim()) {
      setFirstNameError("First name is required.");
      valid = false;
    }

    if (!lastName.trim()) {
      setLastNameError("Last name is required.");
      valid = false;
    }

    if (!birthMonth) {
      setBirthMonthError("Month is required.");
      valid = false;
    }

    if (!year) {
      setYearError("Year is required.");
      valid = false;
    }

    if (!country) {
      setCountryError("Country is required.");
      valid = false;
    }

    return valid;
  };

  // Handlers
  const handleContinue = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCreateAccount = async () => {
    if (!validateStep2()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 to-indigo-900 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Account Created Successfully!
          </h2>
          <p className="mb-4">You will be redirected shortly...</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-indigo-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-white mb-6 md:mb-10 text-center">
          TMA Library
        </h1>

        <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl bg-white">
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center text-white bg-blue-900">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {step === 1 ? "Create an account" : "Complete your profile"}
            </h2>
            <p className="text-center text-lg">
              {step === 1 ? "Step 1 of 2" : "Step 2 of 2"}
            </p>
          </div>

          <div className="hidden md:block w-px bg-gray-300" />

          <div className="w-full md:w-1/2 p-6 bg-white overflow-y-auto">
            {step === 1 ? (
              <>
                <h2 className="text-2xl font-semibold mb-1">
                  Create an account
                </h2>
                <p className="text-sm mb-4">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Sign in
                  </span>
                </p>

                <div className="flex justify-center gap-3 mb-4">
                  <button className="w-10 h-10 p-2 rounded-full border hover:bg-gray-100 transition-colors">
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                    />
                  </button>
                  <button className="w-10 h-10 p-2 rounded-full border hover:bg-gray-100 transition-colors">
                    <img
                      src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                      alt="Facebook"
                    />
                  </button>
                  <button className="w-10 h-10 p-2 rounded-full border hover:bg-gray-100 transition-colors">
                    <img
                      src="https://www.svgrepo.com/show/511330/apple-173.svg"
                      alt="Apple"
                    />
                  </button>
                </div>

                <div className="flex items-center mb-4">
                  <Separator className="flex-grow" />
                  <span className="mx-2 text-sm text-gray-500">Or</span>
                  <Separator className="flex-grow" />
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium">Email address</label>
                  <Input
                    placeholder="Email address"
                    type="email"
                    className={emailError ? "border-red-500" : ""}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-600 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Password</label>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-blue-600 hover:underline"
                      type="button"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className={passwordError ? "border-red-500" : ""}
                    value={password}
                    onChange={(e) => {
                      const pwd = e.target.value;
                      setPassword(pwd);
                      setHasTypedPassword(pwd.length > 0);
                    }}
                    onPaste={handlePaste}
                    onCopy={handlePaste}
                    onCut={handlePaste}
                  />

                  {hasTypedPassword && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1 h-1.5">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full ${
                              calculatePasswordStrength(password) >= i
                                ? getStrengthColor(
                                    calculatePasswordStrength(password)
                                  )
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Password strength:{" "}
                        <span
                          className={`font-medium ${
                            calculatePasswordStrength(password) <= 1
                              ? "text-red-500"
                              : calculatePasswordStrength(password) === 2
                              ? "text-yellow-500"
                              : calculatePasswordStrength(password) === 3
                              ? "text-orange-500"
                              : "text-green-500"
                          }`}
                        >
                          {getStrengthLabel(
                            calculatePasswordStrength(password)
                          )}
                        </span>
                      </p>
                    </div>
                  )}

                  {passwordError && (
                    <p className="text-red-600 text-sm mt-1">{passwordError}</p>
                  )}

                  {hasTypedPassword && (
                    <div className="text-sm mt-2 space-y-1">
                      <p
                        className={
                          passwordRules.length
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {passwordRules.length ? "✓" : "✕"} At least 8 characters
                      </p>
                      <p
                        className={
                          passwordRules.casing
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {passwordRules.casing ? "✓" : "✕"} Upper & lowercase
                        letters
                      </p>
                      <p
                        className={
                          passwordRules.numberOrSymbol
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {passwordRules.numberOrSymbol ? "✓" : "✕"} Number or
                        symbol
                      </p>
                      <p
                        className={
                          passwordRules.noEmail
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {passwordRules.noEmail ? "✓" : "✕"} Not your email
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    placeholder="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      const value = e.target.value;
                      setConfirmPassword(value);
                      if (!password) {
                        setConfirmBeforePasswordError(
                          "Please enter your password first."
                        );
                      } else {
                        setConfirmBeforePasswordError("");
                      }
                    }}
                    onPaste={handlePaste}
                    onCopy={handlePaste}
                    onCut={handlePaste}
                    className={
                      confirmPasswordError || confirmBeforePasswordError
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {confirmPasswordError && (
                    <p className="text-red-600 text-sm mt-1">
                      {confirmPasswordError}
                    </p>
                  )}
                  {confirmBeforePasswordError && (
                    <p className="text-red-600 text-sm mt-1">
                      {confirmBeforePasswordError}
                    </p>
                  )}
                </div>

                <Button
                  className="w-full mb-2 rounded-full"
                  onClick={handleContinue}
                  disabled={isLoading}
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-500">
                      Step 2 of 2
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Create an account
                    </h2>
                  </div>
                  <button
                    onClick={handleBack}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Back
                  </button>
                </div>

                <p className="text-sm mb-4">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Sign in
                  </span>
                </p>

                <div className="flex flex-col md:flex-row md:gap-2 mb-1">
                  <div className="w-full md:w-1/2 mb-2 md:mb-0">
                    <Input
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    {firstNameError && (
                      <p className="text-red-600 text-sm mt-1">
                        {firstNameError}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2">
                    <Input
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    {lastNameError && (
                      <p className="text-red-600 text-sm mt-1">
                        {lastNameError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-sm font-medium">Date of birth</label>
                  <div className="flex flex-col md:flex-row md:gap-2 mb-1">
                    <div className="w-full md:w-1/2 mb-2 md:mb-0">
                      <select
                        className={`w-full border border-gray-300 rounded px-2 py-2 ${
                          birthMonthError ? "border-red-500" : ""
                        }`}
                        value={birthMonth}
                        onChange={(e) => setBirthMonth(e.target.value)}
                      >
                        <option value="">Select month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      {birthMonthError && (
                        <p className="text-red-600 text-sm mt-1">
                          {birthMonthError}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-1/2">
                      <select
                        className={`w-full border border-gray-300 rounded px-2 py-2 ${
                          yearError ? "border-red-500" : ""
                        }`}
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option value="">Select year</option>
                        {years.map((yr) => (
                          <option key={yr} value={yr}>
                            {yr}
                          </option>
                        ))}
                      </select>
                      {yearError && (
                        <p className="text-red-600 text-sm mt-1">{yearError}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-sm font-medium">Country/Region</label>
                  <select
                    className={`w-full border border-gray-300 rounded px-2 py-2 ${
                      countryError ? "border-red-500" : ""
                    }`}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {countryError && (
                    <p className="text-red-600 text-sm mt-1">{countryError}</p>
                  )}
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  <p>By clicking Create account, I agree that:</p>
                  <ul className="list-disc ml-4 mt-1">
                    <li>
                      I have read and accepted the{" "}
                      <a href="#" className="text-blue-600 underline">
                        Terms of Use
                      </a>
                      .
                    </li>
                    <li>
                      The Adobe family of companies may keep me informed with{" "}
                      <a href="#" className="text-blue-600 underline">
                        personalized emails
                      </a>
                      .
                    </li>
                  </ul>
                  <p className="mt-2">
                    See our{" "}
                    <a href="#" className="text-blue-600 underline">
                      Privacy Policy
                    </a>{" "}
                    for more details.
                  </p>
                </div>

                <Button
                  className="w-full rounded-full"
                  onClick={handleCreateAccount}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
