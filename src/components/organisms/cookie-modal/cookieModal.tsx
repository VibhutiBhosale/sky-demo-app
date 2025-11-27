"use client";

import { useEffect, useState } from "react";
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

import { graphqlRequest } from "@/lib/apiClient";
import { GET_COOKIE_CATEGORIES } from "@/graphql/queries/cookies";

type CookieCategory = {
  key: string;
  title: string;
  description: string;
  required: boolean;
};
type ConsentState = Record<string, boolean>;

const COOKIE_KEY = "cookie_consent";

export default function CookieModal() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CookieCategory[]>([]);
  const [consent, setConsent] = useState<ConsentState>({});
  const [expanded, setExpanded] = useState<string | false>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await graphqlRequest<{ cookieCategories: CookieCategory[] }>({
          query: GET_COOKIE_CATEGORIES,
        });

        const list = data.cookieCategories || [];
        setCategories(list);

        // Check if cookie consent exists
        const stored = localStorage.getItem(COOKIE_KEY);

        if (stored) {
          try {
            const parsed = JSON.parse(stored);

            // Validate: stored keys must match DB keys
            const valid = list.every(c => parsed.hasOwnProperty(c.key));

            if (valid) {
              setConsent(parsed);
              setLoading(false);
              return; // Consent exists → do NOT show modal
            }
          } catch {}
        }

        // No valid consent → show the modal
        const defaults = list.reduce((acc: ConsentState, c: CookieCategory) => {
          acc[c.key] = c.required ? true : false;
          return acc;
        }, {});

        setConsent(defaults);
        setOpen(true); // Always open when consent missing
      } catch (err) {
        console.error("Error fetching cookie categories:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const saveConsent = (payload: ConsentState) =>
    localStorage.setItem(COOKIE_KEY, JSON.stringify(payload));

  const handleToggle = (key: string, required: boolean) => {
    if (required) return;
    setConsent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptAll = () => {
    const all = categories.reduce((acc: ConsentState, c: CookieCategory) => {
      acc[c.key] = true;
      return acc;
    }, {});
    setConsent(all);
    saveConsent(all);
    setOpen(false);
  };

  const handleEssentialOnly = () => {
    const onlyEssential = categories.reduce((acc: ConsentState, c: CookieCategory) => {
      acc[c.key] = c.required ? true : false;
      return acc;
    }, {});
    setConsent(onlyEssential);
    saveConsent(onlyEssential);
    setOpen(false);
  };

  const handleSave = () => {
    saveConsent(consent);
    setOpen(false);
  };

  if (loading || categories.length === 0) return null;

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={() => setOpen(false)}>
      <DialogTitle sx={{ fontWeight: 700 }}>Your cookie options</DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Sky and its trusted partners use cookies and similar technologies.
        </Typography>

        <Box>
          {categories.map(cat => {
            const checked = Boolean(consent[cat.key]);

            return (
              <Accordion
                key={cat.key}
                expanded={expanded === cat.key}
                onChange={(_, ex) => setExpanded(ex ? cat.key : false)}
                sx={{ mb: 1, boxShadow: "none", border: "1px solid #eee" }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <Typography sx={{ fontWeight: 700 }}>{cat.title}</Typography>

                    <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
                      {cat.required ? (
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
                                handleToggle(cat.key, cat.required);
                              }}
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
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
        <Box>
          <Button variant="outlined" onClick={handleEssentialOnly}>
            Essential cookies only
          </Button>

          <Button variant="contained" sx={{ ml: 2 }} onClick={handleAcceptAll}>
            Accept all
          </Button>
        </Box>

        <Box>
          <Button variant="text" onClick={handleSave}>
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
