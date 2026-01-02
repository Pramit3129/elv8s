import * as React from "react";

export function EmailTemplate({
  date,
  name,
  contact,
  role,
  interest,
  message,
}) {
  return (
    <div>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tr>
          <td align="center" style={{ padding: "24px" }}>
            <table
              width="600"
              cellPadding="0"
              cellSpacing="0"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <tr>
                <td
                  style={{
                    padding: "20px 24px",
                    backgroundColor: "#111827",
                    color: "#ffffff",
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: "20px" }}>
                    New Contact Form Submission
                  </h2>
                </td>
              </tr>

              {/* Intro */}
              <tr>
                <td style={{ padding: "20px 24px", color: "#374151" }}>
                  <p style={{ margin: 0 }}>
                    You have received a new message from your website.
                    Details are listed below:
                  </p>
                </td>
              </tr>

              {/* Data Table */}
              <tr>
                <td style={{ padding: "0 24px 24px" }}>
                  <table
                    width="100%"
                    cellPadding="8"
                    cellSpacing="0"
                    style={{
                      borderCollapse: "collapse",
                      fontSize: "14px",
                    }}
                  >
                    <tr style={{ backgroundColor: "#f9fafb" }}>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        <strong>Date</strong>
                      </td>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        {date}
                      </td>
                    </tr>

                    <tr>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        <strong>Name</strong>
                      </td>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        {name}
                      </td>
                    </tr>

                    <tr style={{ backgroundColor: "#f9fafb" }}>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        <strong>Contact</strong>
                      </td>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        {contact}
                      </td>
                    </tr>

                    <tr>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        <strong>Role & Interests</strong>
                      </td>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        {role} / {interest.join(", ")}
                      </td>
                    </tr>

                    <tr style={{ backgroundColor: "#f9fafb" }}>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        <strong>Message</strong>
                      </td>
                      <td style={{ border: "1px solid #e5e7eb" }}>
                        {message}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Footer */}
              <tr>
                <td
                  style={{
                    padding: "16px 24px",
                    backgroundColor: "#f9fafb",
                    color: "#6b7280",
                    fontSize: "12px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    This email was automatically generated from your website contact form.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
}
