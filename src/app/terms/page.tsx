import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                <CardDescription>Last updated: July 26, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>Please read these terms and conditions carefully before using Our Service.</p>

                <h2 className="font-semibold text-lg">Interpretation and Definitions</h2>
                <h3 className="font-medium">Interpretation</h3>
                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
                <h3 className="font-medium">Definitions</h3>
                <p>For the purposes of these Terms and Conditions:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named CODEEX AI.</li>
                    <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to CODEEX AI.</li>
                    <li><strong>Service</strong> refers to the Application.</li>
                    <li><strong>Terms and Conditions</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
                    <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>

                <h2 className="font-semibold text-lg">Acknowledgment</h2>
                <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
                <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
                <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>

                <h2 className="font-semibold text-lg">User Accounts</h2>
                <p>When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.</p>
                <p>You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password. You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.</p>

                <h2 className="font-semibold text-lg">Termination</h2>
                <p>We may terminate or suspend Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>
                <p>Upon termination, Your right to use the Service will cease immediately.</p>

                <h2 className="font-semibold text-lg">Governing Law</h2>
                <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Application. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
                
                <h2 className="font-semibold text-lg">Changes to These Terms and Conditions</h2>
                <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>

                <h2 className="font-semibold text-lg">Contact Us</h2>
                <p>If you have any questions about these Terms and Conditions, You can contact us by email: codeex.care@gmail.com</p>
            </CardContent>
        </Card>
    </div>
  );
}
