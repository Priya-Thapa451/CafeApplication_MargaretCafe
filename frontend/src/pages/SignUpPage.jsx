import CustomerSignupForm from "../components/CustomerSignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#E2D1C3] via-[#F3E7DB] to-[#D5BDAF] p-8">
      <div className="bg-white p-12 w-full max-w-3xl rounded-3xl shadow-2xl">
        <h2 className="text-center text-5xl font-bold text-[#6E4523] mb-10">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          
        </p>
        <CustomerSignupForm />
      </div>
    </div>
  );
}
