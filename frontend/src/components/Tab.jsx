import CustomerSignUpForm from "./CustomerSignUpForm";
import StaffSignUpForm from "./StaffSignUpForm";

export default function Tab() {
  return (
    <div role="tablist" className="tabs tabs-bordered justify-center">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Staff"
      />
      <div role="tabpanel" className="tab-content p-10 rounded-box">
        <StaffSignUpForm />
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        className="tab"
        aria-label="Customer"
        defaultChecked
      />
      <div role="tabpanel" className="tab-content p-10">
        <CustomerSignUpForm />
      </div>
    </div>
  );
}