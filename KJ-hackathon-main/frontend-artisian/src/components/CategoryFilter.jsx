import React, { useState } from 'react';

const categories = [
    'ceramics',
    'paintings',
    'jewelery',
    'woodworking',
    'marbles'
];

export const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {

    const handleCategoryChange = (category) => {
        onCategoryChange(category);
    };

    return (
        <div className="">
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 category_button ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};