import React, { useState } from 'react';

type Props = {
    onSubmit: (data: any) => void;
};

export default function AddressForm({ onSubmit }: Props) {
    const [form, setForm] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [errors, setErrors] = useState<any>({});

    const validate = () => {
        const errs: any = {};
        if (!form.name) errs.name = 'Name required';
        if (!form.address) errs.address = 'Address required';
        if (!form.city) errs.city = 'City required';
        if (!form.postalCode) errs.postalCode = 'Postal code required';
        if (!form.country) errs.country = 'Country required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(form);
        }
    };

    return (
        <form onSubmit={handleSubmit} data-testid="address-form">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            {errors.name && <span>{errors.name}</span>}
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
            {errors.address && <span>{errors.address}</span>}
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
            {errors.city && <span>{errors.city}</span>}
            <input name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} />
            {errors.postalCode && <span>{errors.postalCode}</span>}
            <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
            {errors.country && <span>{errors.country}</span>}
            <button type="submit">Continue</button>
        </form>
    );
}
