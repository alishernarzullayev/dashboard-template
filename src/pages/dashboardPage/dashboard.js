import React, { cloneElement, useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { FaCaretRight, FaCaretLeft, FaGripHorizontal } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import { RiArrowLeftRightFill } from "react-icons/ri";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import category from "../../const";
import Home from "../../components/home";
import { AuthContext } from "../../userContext";
import { Navigate } from "react-router-dom";
import { PageableContext } from "../../pageableContext";
import AccountMenu from "../../components/avatar";
import { TablePagination } from "@mui/material";
import Sort from "../../components/sort";
import CalendarsDateRangePicker from "../../components/datePicker";
import { ClipLoader } from "react-spinners";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const {
    data,
    loading,
    page,
    rowsPerPage,
    setFetchLink,
    setPage,
    setRowsPerPage,
    setDesc,
    setSortBy,
    setStartDate,
    setEndDate,
  } = useContext(PageableContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // my components

  const [role, setRole] = useState("");
  const [component, setComponent] = useState(<Home />);

  const { state, logout } = useContext(AuthContext);
  useEffect(() => {
    if (state.user) setRole(state?.user.role);
  }, [state]);

  const [item, setItem] = useState(category[0]);

  if (!state.isUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#6200ee",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexdirection: "row",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 3,
                ...(open && { display: "none" }),
              }}
            >
              <FaGripHorizontal />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {item.name}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexdirection: "row",
              gap: "1rem",
            }}
          >
            <IconButton
              color="inherit"
              onClick={() => {
                if (item.fetchLink) {
                  setFetchLink(item.fetchLink);
                  setPage(0);
                  setRowsPerPage(25);
                }
              }}
            >
              <AiOutlineReload />
            </IconButton>
            <AccountMenu logout={logout} name={state.user.firstName} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <FaCaretRight /> : <FaCaretLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {category.map((e, index) => {
            return (
              category[index].roles.includes(role) && (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    setPage(0);
                    setRowsPerPage(25);
                    e.pageable && setFetchLink(e.fetchLink);
                    setItem(e);
                    setComponent(e.component);
                  }}
                  sx={{
                    background: e.link === item.link && "#0088cc30",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#0088cc",
                      fontSize: "1.5rem",
                    }}
                  >
                    {e.icon}
                  </ListItemIcon>
                  <ListItemText primary={e.name} />
                </ListItem>
              )
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, alignItems: "center" }}>
        <DrawerHeader />
        {item.pageable && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Sort
              options={item.sortOptions}
              setDesc={setDesc}
              setSortBy={setSortBy}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <CalendarsDateRangePicker
                label={"Start Date"}
                setDate={setStartDate}
              />
              <RiArrowLeftRightFill />
              <CalendarsDateRangePicker
                label={"End Date"}
                setDate={setEndDate}
              />
            </div>

            <TablePagination
              component="div"
              count={data.totalCount ? data.totalCount : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
        {!loading || item.link === "/" ? (
          cloneElement(component, {
            allData: data,
            loading: loading,
          })
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            <ClipLoader color="#0088cc" />
          </div>
        )}
      </Box>
    </Box>
  );
}
