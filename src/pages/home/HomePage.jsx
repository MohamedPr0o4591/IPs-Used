import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Container } from "react-bootstrap";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { db } from "../../config/firebase";

function HomePage() {
  const [IP, setIP] = useState("");
  const [search, setSearch] = useState("");
  const [allIPs, setAllIPs] = useState([]);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleLogin = (_) => {
    navigate("/login");
  };

  useEffect(() => {
    // استعلام لجلب جميع العناوين IP من Firestore
    const unsubscribe = db.collection("IPAddress").onSnapshot((snapshot) => {
      const IPsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ip: doc.data().ip,
      }));
      setData(IPsData);
    });

    // إلغاء الاشتراك عندما يتم تفريغ المكون أو إيقافه
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setAllIPs(data);
  }, [data]);

  const handleAddIP = () => {
    if (IP.trim() !== "") {
      // إضافة عنوان IP جديد إلى Firestore
      db.collection("IPAddress")
        .add({
          ip: IP,
        })
        .then(() => {
          console.log("IP added successfully!");
          setIP("");
        })
        .catch((error) => {
          console.error("Error adding IP: ", error);
        });
    } else {
      console.warn("IP address cannot be empty!");
    }
  };

  const OnSearch = (word) => {
    if (word.trim() !== "") {
      const filteredIPs = data.filter((ipData) => ipData.ip.includes(word));
      setAllIPs(filteredIPs);
    } else {
      setAllIPs(data);
    }
  };

  return (
    <div className="home-page">
      <Container>
        {localStorage.login === "TCL" ? (
          <Stack gap={2} className="border-bottom">
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <input
                type="text"
                placeholder="New IP ex: 1.1.1.1"
                style={{ flexGrow: 1 }}
                value={IP}
                onChange={(e) => setIP(e.target.value)}
              />

              <Button variant="contained" onClick={handleAddIP}>
                Add
              </Button>
            </Stack>

            <input
              type="text"
              placeholder="Search ex: 1.1.1.1"
              className="w-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => OnSearch(e.target.value)}
            />
          </Stack>
        ) : (
          <Stack direction={"row"} gap={2}>
            <Box flexGrow={1} />
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Stack>
        )}

        <Stack gap={1} mt={2}>
          {allIPs
            ? allIPs.map((ipData) => {
                return (
                  <Paper
                    key={ipData.id}
                    className="p-2 d-flex gap-2 align-items-center"
                    sx={{
                      background: "#3b6172",
                      color: "#efef",
                    }}
                  >
                    <LocationOn />
                    <Typography>IP: </Typography>
                    <Typography>{ipData.ip}</Typography>
                  </Paper>
                );
              })
            : null}
        </Stack>
      </Container>
    </div>
  );
}

export default HomePage;
