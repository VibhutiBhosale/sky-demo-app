"use client";

import React, { useState } from "react";
import {
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
  Typography,
  Divider,
  Button,
  Popper,
  ClickAwayListener,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import "./header.scss";

interface NavItem {
  key: string;
  url?: string;
  submenu?: string[];
  position: "left" | "right";
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "Watch",
    url: "/watch",
    submenu: ["Cinema", "Sports", "Kids", "discovery+", "What to watch"],
    position: "left",
  },
  {
    key: "TV",
    url: "/tv",
    submenu: ["Stream", "Glass", "Sky Q", "TV & Broadband"],
    position: "left",
  },
  {
    key: "Glass",
    url: "/glass",
    submenu: ["Glass Gen 2", "Glass Air", "New", "Tech specs", "Switching to Sky Glass"],
    position: "left",
  },
  {
    key: "Broadband",
    url: "/broadband",
    submenu: [
      "Broadband",
      "TV & Broadband",
      "Full Fibre Broadband",
      "Broadband for Gaming",
      "Broadband for Business",
    ],
    position: "left",
  },
  {
    key: "Mobile",
    url: "/mobile",
    submenu: [
      "Sky Mobile",
      "Phones",
      "SIM",
      "Tablets & Laptops",
      "Brands",
      "Accessories",
      "SIM Activation",
      "Manage",
    ],
    position: "left",
  },
  { key: "Protect", url: "/protect", position: "left" },
  { key: "Business", url: "/business", position: "left" },
  { key: "Deals", url: "/deals", position: "left" },

  // RIGHT SIDE ITEM — Help menu
  {
    key: "Help",
    url: "/help",
    submenu: [
      "Help",
      "My Account",
      "Broadband",
      "TV",
      "Mobile",
      "Talk",
      "VIP",
      "Sky Customer Forum",
    ],
    position: "right",
  },
];

export default function Header(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuOpenKey, setMenuOpenKey] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [openMobileKeys, setOpenMobileKeys] = useState<Record<string, boolean>>({});
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);

  const notifOpen = Boolean(notifAnchor);

  const handleArrowClick = (event: React.MouseEvent<HTMLElement>, key: string) => {
    if (menuOpenKey === key) {
      setAnchorEl(null);
      setMenuOpenKey("");
    } else {
      setAnchorEl(event.currentTarget);
      setMenuOpenKey(key);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpenKey("");
  };

  const toggleMobileKey = (key: string) => {
    setOpenMobileKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Single-source for ALL nav dropdown data
  const activeMenu = NAV_ITEMS.find(item => item.key === menuOpenKey);

  const LEFT_ITEMS = NAV_ITEMS.filter(i => i.position === "left");
  const HELP_ITEM = NAV_ITEMS.find(i => i.position === "right");

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(notifAnchor ? null : event.currentTarget);
  };

  const handleNotifClose = () => setNotifAnchor(null);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <header className="bg-white shadow-none">
          <Toolbar
            className="flex"
            sx={{
              minHeight: "44px",
              "@media (min-width:600px)": { minHeight: "44px" },
            }}
          >
            {/* Logo */}
            <div className="logo-wrapper">
              <a className="masthead-logo" href="https://www.sky.com" aria-label="Sky home"></a>
            </div>

            {/* LEFT NAV */}
            <nav className="mr-auto flex items-center gap-4 pl-6">
              {LEFT_ITEMS.map(item => (
                <div key={item.key} className="relative flex items-center gap-1">
                  <a
                    href={item.url ?? "#"}
                    className="text-base leading-6 text-[#4a4a4a] hover:underline"
                  >
                    {item.key}
                  </a>

                  {item.submenu && (
                    <IconButton
                      disableRipple
                      disableFocusRipple
                      size="small"
                      onClick={e => handleArrowClick(e, item.key)}
                      className="!shadow-none hover:!bg-transparent active:!bg-transparent"
                    >
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          menuOpenKey === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </IconButton>
                  )}
                </div>
              ))}
            </nav>

            {/* RIGHT SIDE UTILITIES */}
            <div className="flex items-center gap-4">
              <SearchIcon className="cursor-pointer text-gray-600" />

              {/* BELL ICON */}
              <IconButton
                disableRipple
                disableFocusRipple
                onClick={handleNotifClick}
                className="!shadow-none hover:!bg-transparent active:!bg-transparent"
              >
                <NotificationsNoneIcon className="cursor-pointer text-gray-600" />
              </IconButton>

              {/* HELP MENU (RIGHT-SIDE NAV ITEM) */}
              {HELP_ITEM && (
                <div className="relative flex items-center gap-1">
                  <span className="text-base text-[#4a4a4a]">{HELP_ITEM.key}</span>

                  {HELP_ITEM.submenu && (
                    <IconButton
                      disableRipple
                      disableFocusRipple
                      size="small"
                      onClick={e => handleArrowClick(e, HELP_ITEM.key)}
                      className="!shadow-none hover:!bg-transparent active:!bg-transparent"
                    >
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${
                          menuOpenKey === HELP_ITEM.key ? "rotate-180" : ""
                        }`}
                      />
                    </IconButton>
                  )}
                </div>
              )}

              <a href="/login" className="text-base leading-6 text-[#4a4a4a] hover:underline">
                Sign in
              </a>
            </div>
          </Toolbar>
        </header>
      </div>

      {/* DROPDOWN MENU */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {activeMenu?.submenu?.map(s => (
          <MenuItem key={s} onClick={handleMenuClose}>
            {s}
          </MenuItem>
        ))}
      </Menu>

      {/* MOBILE HEADER */}
      <div className="block md:hidden">
        <header className="bg-white shadow-none">
          <Toolbar
            className="flex items-center justify-between border-b-2 px-4 py-3"
            sx={{ minHeight: "44px" }}
            style={{
              borderImage:
                "linear-gradient(90deg,#ff7a00 0%,#ff4da6 30%,#7b46ff 70%,#2f7bff 100%) 1",
            }}
          >
            <IconButton
              edge="start"
              onClick={() => setDrawerOpen(true)}
              disableRipple
              disableFocusRipple
              className="!shadow-none"
            >
              <MenuIcon />
            </IconButton>

            <img src="/sky-logo.png" alt="logo" className="h-6" />

            <a href="/signin" className="text-sm text-gray-700">
              Sign in
            </a>
          </Toolbar>
        </header>
      </div>

      {/* MOBILE SLIDE-IN MENU */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: "100%", background: "white" } }}
      >
        <Box className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <img src="/sky-logo.png" alt="logo" className="h-6" />

            <IconButton onClick={() => setDrawerOpen(false)} disableRipple disableFocusRipple>
              <CloseIcon />
            </IconButton>
          </div>

          <Box className="flex-1 overflow-auto">
            <List>
              {NAV_ITEMS.map(item => (
                <div key={item.key}>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={item.submenu ? "button" : "a"}
                      href={!item.submenu ? item.url : undefined}
                      onClick={() =>
                        item.submenu ? toggleMobileKey(item.key) : setDrawerOpen(false)
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography className="text-base font-medium">{item.key}</Typography>
                        }
                      />

                      {item.submenu && (
                        <ChevronDownIcon
                          className={`h-4 w-4 transition-transform ${
                            openMobileKeys[item.key] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>

                  {item.submenu && (
                    <Collapse in={!!openMobileKeys[item.key]} timeout="auto" unmountOnExit>
                      <List disablePadding className="pl-6">
                        {item.submenu.map(s => (
                          <ListItem key={s} disablePadding>
                            <ListItemButton
                              component="a"
                              href="#"
                              onClick={() => setDrawerOpen(false)}
                            >
                              <ListItemText primary={s} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
            </List>
          </Box>

          <Divider />

          <div className="p-4">
            <Button fullWidth variant="outlined" href="/signin">
              Sign in
            </Button>
          </div>
        </Box>
      </Drawer>

      {/* NOTIFICATION POPUP */}
      <Popper
        open={notifOpen}
        anchorEl={notifAnchor}
        placement="bottom-end"
        modifiers={[{ name: "offset", options: { offset: [0, 12] } }]}
      >
        <ClickAwayListener onClickAway={handleNotifClose}>
          <Paper
            elevation={3}
            sx={{
              width: 360,
              borderRadius: "12px",
              p: 3,
              mt: 1,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
            }}
          >
            <h3 className="text-[18px] font-semibold text-[#4a4a4a]">You&apos;re up to date</h3>
            <p className="mt-1 text-[14px] text-[#666]">No new alerts</p>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
