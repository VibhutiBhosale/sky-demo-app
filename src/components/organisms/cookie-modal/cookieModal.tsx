"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const COOKIE_CATEGORIES = [
  {
    key: "essential",
    title: "Essential cookies",
    description:
      "These cookies are required for basic website functionality and cannot be disabled. They help keep the site secure and provide core features.",
    required: true,
  },
  {
    key: "analytics",
    title: "Analytics Storage",
    description:
      "Analytics cookies help us understand how people use the site so we can improve it. They collect anonymous usage data.",
    required: false,
  },
  {
    key: "advertising",
    title: "Personalised advertising and content",
    description:
      "These cookies are used to deliver personalised advertising and measure its performance.",
    required: false,
  },
  {
    key: "preferences",
    title: "Store and/or access information on a device",
    description:
      "Used to remember your choices (language, region, accessibility) so you don't have to re-enter them every visit.",
    required: false,
  },
];

type ConsentState = Record<string, boolean>;

//LocalStorage key used to store the user's consent.
const Cookie_Key = "cookie_consent";

export default function CookieModal() {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({});
  const [expanded, setExpanded] = useState<string | false>(false);

  // Initialize consent defaults from localStorage (or defaults)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(Cookie_Key);
      if (stored) {
        setConsent(JSON.parse(stored));
        // if stored, don't show modal
        setOpen(false);
        return;
      }
    } catch (err) {
      // ignore parse error
    }

    // If user is logged in (or visited), show the modal.
    const loggedIn = Boolean(sessionStorage.getItem("email"));
    if (loggedIn) {
      setConsent(
        COOKIE_CATEGORIES.reduce((acc, c) => {
          acc[c.key] = c.required ? true : false;
          return acc;
        }, {} as ConsentState)
      );
      setOpen(true);
    }
  }, []);

  // write consent to localStorage
  const saveConsent = (payload: ConsentState) => {
    localStorage.setItem(Cookie_Key, JSON.stringify(payload));
  };

  const handleToggle = (key: string) => {
    if (COOKIE_CATEGORIES.find(c => c.key === key)?.required) return;
    setConsent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptAll = () => {
    const payload = COOKIE_CATEGORIES.reduce((acc, c) => {
      acc[c.key] = true;
      return acc;
    }, {} as ConsentState);
    setConsent(payload);
    saveConsent(payload);
    setOpen(false);
  };

  const handleEssentialOnly = () => {
    const payload = COOKIE_CATEGORIES.reduce((acc, c) => {
      acc[c.key] = c.required ?? false;
      return acc;
    }, {} as ConsentState);
    setConsent(payload);
    saveConsent(payload);
    setOpen(false);
  };

  const handleSave = () => {
    saveConsent(consent);
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="cookie-dialog-title"
      disableEnforceFocus
    >
      <DialogTitle id="cookie-dialog-title" sx={{ fontWeight: 700 }}>
        Your cookie options
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Sky and its trusted partners use cookies and similar tech to store cookies and access
          personal data on your device. You can choose which ones you’re comfortable with.
        </Typography>

        {/* Accordion list */}
        <Box>
          {COOKIE_CATEGORIES.map(cat => {
            const isRequired = !!cat.required;
            const checked = Boolean(consent[cat.key]);

            return (
              <Accordion
                key={cat.key}
                expanded={expanded === cat.key}
                onChange={(_, ex) => setExpanded(ex ? cat.key : false)}
                sx={{ mb: 1, boxShadow: "none", border: "1px solid #eee" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${cat.key}-content`}
                  id={`${cat.key}-header`}
                >
                  <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <Typography sx={{ fontWeight: 700 }}>{cat.title}</Typography>

                    <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
                      {isRequired ? (
                        <Typography variant="caption" color="text.secondary">
                          Required
                        </Typography>
                      ) : (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checked}
                              onClick={e => {
                                e.stopPropagation();
                                handleToggle(cat.key);
                              }}
                              onFocus={e => e.stopPropagation()}
                              disabled={isRequired}
                              inputProps={{ "aria-label": `${cat.title} toggle` }}
                            />
                          }
                          label=""
                        />
                      )}
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography variant="body2">{cat.description}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
          Our partners use cookies, IDs and other tech. You can change these anytime from privacy
          options in the footer.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
        <Box>
          <Button onClick={handleEssentialOnly} variant="outlined" sx={{ mr: 2 }}>
            Essential cookies only
          </Button>

          <Button onClick={handleAcceptAll} variant="contained" color="primary">
            Accept all
          </Button>
        </Box>

        <Box>
          <Button onClick={handleSave} variant="text" sx={{ mr: 1 }}>
            Save my choices
          </Button>
          <Link href="/privacy" underline="hover" sx={{ ml: 1 }}>
            View options
          </Link>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
