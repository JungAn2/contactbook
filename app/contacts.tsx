"use client";
import React, { useEffect, useState } from "react";

async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:5000/contacts",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function insertData(newContact: { name: string; phone: string }) {
  try {
    const response = await fetch("http://127.0.0.1:5000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export { fetchData, insertData };



