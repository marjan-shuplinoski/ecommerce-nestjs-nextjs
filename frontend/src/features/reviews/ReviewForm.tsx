import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../shared/components/ui/Button';
import Input from '../../shared/components/ui/Input';
import Textarea from '../../shared/components/ui/Textarea';
import { RatingStars } from './RatingStars';

const reviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(10),
    images: z.array(z.instanceof(File)).optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export const ReviewForm: React.FC<{ onSubmit: (data: ReviewFormValues) => void }> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: { rating: 0, comment: '', images: [] },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setValue('images', Array.from(e.target.files));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <RatingStars value={watch('rating')} onChange={val => setValue('rating', val)} />
            {errors.rating && <span className="text-red-500">Rating is required</span>}
            <Textarea {...register('comment')} placeholder="Write your review..." />
            {errors.comment && <span className="text-red-500">Comment is required (min 10 chars)</span>}
            <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
            <Button type="submit">Submit Review</Button>
        </form>
    );
};
