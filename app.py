from flask import Flask, render_template, request
from urllib.parse import urlparse
import re

app = Flask(__name__)


def analyze_url(url):
    result = {
        "status": "",
        "message": "",
        "https": False,
        "valid": False,
        "suspicious": False,
        "score": 0
    }

    # Add HTTPS if no protocol is provided
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    # Parse URL
    parsed = urlparse(url)

    # Check whether a domain exists
    if not parsed.netloc:
        result["status"] = "Invalid"
        result["message"] = "The URL format is not valid."
        result["score"] = 100
        return result

    result["valid"] = True

    # Start with zero risk
    risk_score = 0

    # Check HTTPS
    if parsed.scheme == "https":
        result["https"] = True
    else:
        risk_score += 25

    # Suspicious URL patterns
    suspicious_patterns = [
        r"@",
        r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}",
        r"login.*verify",
        r"secure.*account",
        r"free.*gift",
        r"password"
    ]

    found_suspicious = False

    for pattern in suspicious_patterns:
        if re.search(pattern, url.lower()):
            found_suspicious = True
            break

    if found_suspicious:
        result["suspicious"] = True
        risk_score += 45

    # Check URL length
    if len(url) > 100:
        risk_score += 15

    # Check for too many subdomains
    domain_parts = parsed.netloc.split(".")

    if len(domain_parts) > 4:
        risk_score += 15

    # Make sure score doesn't exceed 100
    risk_score = min(risk_score, 100)

    result["score"] = risk_score

    # Determine final result
    if risk_score >= 70:
        result["status"] = "High Risk"
        result["message"] = "This URL contains several suspicious indicators."

    elif risk_score >= 30:
        result["status"] = "Medium Risk"
        result["message"] = "This URL contains some security warning indicators."

    else:
        result["status"] = "Low Risk"
        result["message"] = (
            "No major warning indicators were detected by the basic checks."
        )

    return result


@app.route("/", methods=["GET", "POST"])
def home():

    result = None
    url = ""

    if request.method == "POST":
        url = request.form.get("url", "").strip()

        if url:
            result = analyze_url(url)

    return render_template(
        "index.html",
        result=result,
        url=url
    )


if __name__ == "__main__":
    app.run(debug=False)