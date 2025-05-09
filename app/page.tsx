"use client";
import React, { useEffect, useState } from "react";
import { fetchData, insertData } from "./contacts";

export default function Home() {
  const [contactList, setContactList] = useState<any[]>([]);

  async function getData() {
    try {
      const data = await fetchData();
      setContactList(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function insert() {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const newContact = { name, phone };
    insertData(newContact);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div
        id="contactList"
        className="flex flex-col items-center justify-center min-h-screen py-2"
      >
        <h1 className="text-2xl font-bold">Contact List</h1>
        <ul id="contactList" className="list-disc">
          {contactList.map((contact, index) => (
            <li key={index} className="text-lg">
              {contact.name} - {contact.phone}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getData}
      >
        fetchData
      </button>
      <input type="text" placeholder="Name" id="name" />
      <input type="text" placeholder="Phone" id="phone" />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={insert}
      >
        Insert Data
      </button>
    </div>
  );
}
