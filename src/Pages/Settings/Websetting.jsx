import BasicInfoForm from "../WebsiteSetting/BasicInfoForm";
import ContactInfoForm from "../WebsiteSetting/ContactInfoForm";
import SocialLinksForm from "../WebsiteSetting/SocialLinksForm";
import SEOSettingsForm from "../WebsiteSetting/SEOSettingsForm";
import SecurityMaintenanceForm from "../WebsiteSetting/SecurityMaintenanceForm";
import SMTPConfigForm from "../WebsiteSetting/SMTPConfigForm";

function Websetting() {
  return (
    <div className="body-content px-8 py-8 bg-slate-100">
      <div className="flex justify-between mb-10">
        <h3 className="mb-0 text-[28px]">Website Settings</h3>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Basic Information */}
        <BasicInfoForm />

        <ContactInfoForm />

        {/* Social Media */}
        <SocialLinksForm />

        {/* SEO Settings */}
        <SEOSettingsForm />

        <SecurityMaintenanceForm />
        <SMTPConfigForm />
      </div>
    </div>
  );
}

export default Websetting;
