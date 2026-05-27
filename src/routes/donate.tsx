import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Heart, Check, Shield, ReceiptText, Sparkles } from "lucide-react";
import { PageHero } from "@/components/Breadcrumb";
import causeRelief from "@/assets/cause-relief.jpg";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Dr. A.G.S.S.T Trust" },
      {
        name: "description",
        content:
          "Support our work — choose a ₹99 monthly subscription or a one-time gift. 80G tax exemption.",
      },
      { property: "og:title", content: "Donate to Dr. A.G.S.S.T Trust" },
      {
        property: "og:description",
        content: "Your gift transforms lives across Maharashtra. 80G certified.",
      },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

type Mode = "monthly" | "onetime";

function DonatePage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("monthly");
  const [amount, setAmount] = useState<number>(99);
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    pan: "",
    address: "",
  });

  const presets = [99, 501, 1001, 5001];

  /**
   * FUTURE Razorpay Integration
   * Backend-ready API placeholders:
   *  - POST /api/create-subscription  (monthly autopay)
   *  - POST /api/create-order         (one-time)
   *  - POST /api/verify-payment       (signature verification)
   *  - POST /api/donation-success     (receipt + email trigger)
   * For now this is a UI-only mock that simulates a success state.
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const finalAmount = mode === "monthly" ? 99 : customAmount ? Number(customAmount) : amount;
    // TODO(razorpay): replace with createSubscription / createOrder call
    console.info("[donation:mock]", { mode, amount: finalAmount, ...form });
    setSubmitted(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }

  return (
    <>
      <PageHero
        title={t("donate.title")}
        subtitle={t("donate.subtitle")}
        breadcrumb={t("nav.donate")}
        image={causeRelief}
      />

      <section className="py-16 md:py-24">
        <div className="container-x mx-auto max-w-6xl">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl p-10 md:p-16 bg-card border border-border shadow-elevated text-center"
            >
              <div className="h-16 w-16 mx-auto rounded-full gradient-accent grid place-items-center shadow-glow-orange">
                <Check className="h-8 w-8 text-accent-foreground" />
              </div>
              <h2 className="mt-6 font-display text-3xl md:text-4xl font-bold">Thank you 🙏</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t("donate.success")}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t("donate.receipt")}</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", mobile: "", email: "", pan: "", address: "" });
                }}
                className="mt-8 inline-flex rounded-full gradient-primary text-primary-foreground px-6 py-3 font-bold"
              >
                Make another donation
              </button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Options */}
              <div className="lg:col-span-2 space-y-5">
                <button
                  onClick={() => setMode("monthly")}
                  className={`w-full text-left rounded-3xl p-6 border-2 transition relative overflow-hidden ${mode === "monthly" ? "border-accent shadow-glow-orange bg-card" : "border-border bg-card hover:border-accent/50"}`}
                >
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest gradient-accent text-accent-foreground rounded-full px-2.5 py-1">
                    <Sparkles className="h-3 w-3" /> {t("donate.monthlyBadge")}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-accent font-bold">
                    Subscription
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-display text-5xl font-bold">₹99</span>
                    <span className="text-muted-foreground font-semibold">/ month</span>
                  </div>
                  <p className="mt-2 font-bold">{t("donate.monthlyTitle")}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("donate.monthlyBody")}</p>
                </button>

                <button
                  onClick={() => setMode("onetime")}
                  className={`w-full text-left rounded-3xl p-6 border-2 transition ${mode === "onetime" ? "border-primary shadow-glow-blue bg-card" : "border-border bg-card hover:border-primary/50"}`}
                >
                  <div className="text-xs uppercase tracking-widest text-primary font-bold">
                    One-time gift
                  </div>
                  <div className="mt-2 font-display text-3xl font-bold">
                    {t("donate.oneTimeTitle")}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{t("donate.oneTimeBody")}</p>
                  {mode === "onetime" && (
                    <div className="mt-5 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {presets.map((p) => (
                          <button
                            type="button"
                            key={p}
                            onClick={(e) => {
                              e.stopPropagation();
                              setAmount(p);
                              setCustomAmount("");
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition ${amount === p && !customAmount ? "gradient-primary text-primary-foreground border-transparent" : "border-border hover:border-primary"}`}
                          >
                            ₹{p.toLocaleString("en-IN")}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        min={1}
                        placeholder={t("donate.customAmount")}
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setAmount(0);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full rounded-full border-2 border-border px-5 py-2.5 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                  )}
                </button>

                <div className="rounded-2xl p-4 bg-secondary border border-border flex gap-3">
                  <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">{t("donate.tax")}</span>{" "}
                    {t("donate.receipt")}
                  </div>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="lg:col-span-3 rounded-3xl p-6 md:p-10 bg-card border border-border shadow-soft space-y-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-accent fill-current" />
                  <h2 className="font-display text-2xl font-bold">Donor Details</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label={t("donate.form.name")}
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <Field
                    label={t("donate.form.mobile")}
                    value={form.mobile}
                    onChange={(v) => setForm({ ...form, mobile: v })}
                    type="tel"
                    pattern="[0-9]{10}"
                    required
                  />
                  <Field
                    label={t("donate.form.email")}
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    type="email"
                    required
                  />
                  <Field
                    label={t("donate.form.pan")}
                    value={form.pan}
                    onChange={(v) => setForm({ ...form, pan: v.toUpperCase() })}
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]"
                  />
                </div>
                <Field
                  label={t("donate.form.address")}
                  value={form.address}
                  onChange={(v) => setForm({ ...form, address: v })}
                  required
                />

                {mode === "onetime" && (
                  <Field
                    label={t("donate.form.amount")}
                    type="number"
                    value={String(customAmount || amount || "")}
                    onChange={(v) => {
                      setCustomAmount(v);
                      setAmount(0);
                    }}
                    required
                  />
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 gradient-accent rounded-full py-4 font-bold text-accent-foreground text-base shadow-glow-orange hover:scale-[1.01] transition"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    {mode === "monthly" ? t("donate.monthlyCta") : t("donate.proceed")}
                    <span className="opacity-80">
                      · ₹
                      {(mode === "monthly"
                        ? 99
                        : Number(customAmount) || amount || 0
                      ).toLocaleString("en-IN")}
                    </span>
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ReceiptText className="h-3.5 w-3.5" /> 80G eligible · 100% secure · Razorpay
                    integration coming soon
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  pattern,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  pattern?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        pattern={pattern}
        className="mt-1.5 w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition"
      />
    </label>
  );
}
