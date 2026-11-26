export default async function handler(req, res) {
  const slug = String(req.query.slug || "").trim();
  const gasExecUrl = "https://script.google.com/macros/s/AKfycbypyly5VuipaNW_2bNoDROlaYJ52uu278gkQwW9KKL70hL-K2CC3gNFNh76Jd59tBNI/exec";

  if (!slug) {
    return res.redirect(302, gasExecUrl);
  }

  try {
    const response = await fetch(`${gasExecUrl}?mode=json&to=${encodeURIComponent(slug)}`, {
      redirect: "follow"
    });
    const data = await response.json();

    if (data.status === "OK" && data.url) {
      return res.redirect(302, data.url);
    }
    return res.redirect(302, `${gasExecUrl}?to=${encodeURIComponent(slug)}`);
  } catch (err) {
    return res.redirect(302, `${gasExecUrl}?to=${encodeURIComponent(slug)}`);
  }
}
