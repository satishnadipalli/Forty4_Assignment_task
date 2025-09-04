"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createUser, getUser, updateUser } from "../services/api.js"

const initial = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: { street: "", city: "", zip: "" },
}

export default function UserForm({ edit = false }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (edit && id) {
      ;(async () => {
        try {
          const data = await getUser(id)
          setValues({
            ...initial,
            ...data,
            address: {
              street: data.address?.street || "",
              city: data.address?.city || "",
              zip: data.address?.zip || "",
            },
          })
        } catch (e) {
          alert("Failed to load user")
          navigate("/users")
        }
      })()
    }
  }, [edit, id, navigate])

  const validate = () => {
    const errs = {}
    if (!values.name.trim()) errs.name = "Name is required"
    if (!values.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = "Invalid email"
    if (!values.phone.trim()) errs.phone = "Phone is required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const onChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("address.")) {
      const key = name.split(".").pop()
      setValues((v) => ({ ...v, address: { ...v.address, [key]: value } }))
    } else {
      setValues((v) => ({ ...v, [name]: value }))
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    const payload = {
      ...values,
      address: {
        street: values.address.street || undefined,
        city: values.address.city || undefined,
        zip: values.address.zip || undefined,
      },
    }
    try {
      if (edit) await updateUser(id, payload)
      else await createUser(payload)
      navigate("/users")
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to save user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{edit ? "Edit User" : "Create New User"}</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
            <input
              name="name"
              value={values.name}
              onChange={onChange}
              required
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              placeholder="Enter full name"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
              required
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
            <input
              name="phone"
              type="tel"
              value={values.phone}
              onChange={onChange}
              required
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
            <input
              name="company"
              value={values.company}
              onChange={onChange}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              placeholder="Enter company name"
            />
          </div>
        </div>

        <fieldset className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
          <legend className="px-3 text-sm font-semibold text-gray-700">Address Information</legend>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Street</label>
              <input
                name="address.street"
                value={values.address.street}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-all"
                placeholder="Street address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">City</label>
              <input
                name="address.city"
                value={values.address.city}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-all"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Zip Code</label>
              <input
                name="address.zip"
                value={values.address.zip}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 transition-all"
                placeholder="Zip code"
              />
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end">
          <button
            disabled={loading}
            className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? "Saving..." : edit ? "Update User" : "Create User"}
          </button>
        </div>
      </form>
    </section>
  )
}
