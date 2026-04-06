"use client"

import { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from './../app/firebase/firebase.config';

interface Item {
  id: string;
  nombre: string;
  correo: string;
  fecha: string;
}

export default function Home() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [fecha, setFecha] = useState('');
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems()
  }, [])

  const handleAdd = async () => {
    if (!nombre || !correo || !fecha) return;
    await addDoc(collection(db, 'items'), { nombre, correo, fecha })
    setNombre('');
    setCorreo('');
    setFecha('');
    fetchItems();
  }

  const handleDelete = async (id: string) => {
    if (!id) return;
    await deleteDoc(doc(db, 'items', id));
    fetchItems();
  }

  const handleEdit = async (item: Item) => {
    const nuevoNombre = prompt("Nuevo Nombre", item.nombre);
    const nuevoCorreo = prompt("Nuevo Correo", item.correo);
    const nuevaFecha = prompt("Nueva Fecha", item.fecha);

    if (!nuevoNombre || !nuevoCorreo || !nuevaFecha) return;
    await updateDoc(doc(db, 'items', item.id), {
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      fecha: nuevaFecha,
    });
    fetchItems();
  }

  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, 'items'))
    setItems(snapshot.docs.map((doc) => {
      const data = doc.data() as { nombre?: string; correo?: string; fecha?: string };
      return {
        id: doc.id,
        nombre: data.nombre || '',
        correo: data.correo || '',
        fecha: data.fecha || '',
      };
    }));
  }

  return (
    <div className="font-sans grid grid-rows-[auto_auto_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>NextJS Firebase</h1>

      <div className="grid gap-4 w-full max-w-md">
        <input
          type="text"
          className="border-2 p-2 rounded"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          className="border-2 p-2 rounded"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="date"
          className="border-2 p-2 rounded"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button className="border p-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={handleAdd}>
          Agregar
        </button>
      </div>

      <ul className="w-full max-w-2xl space-y-3 mt-6">
        {items.map((item) => (
          <li key={item.id} className="border rounded p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <strong>{item.nombre}</strong> - {item.correo} - {item.fecha}
            </div>
            <div className="flex gap-2">
              <button
                className="p-2 border bg-yellow-500 text-white rounded"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="p-2 border bg-red-500 text-white rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

