## Live URL: https://book-catalog-with-prisma.vercel.app

## API Endpoints

## User

1. api/v1/auth/signup (POST)
2. api/v1/auth/signin (POST)
3. api/v1/users (GET)
4. api/v1/users/0eaf9ed0-b563-4436-a42b-3176adbcf16f (Single GET)
5. api/v1/users/0eaf9ed0-b563-4436-a42b-3176adbcf16f (PATCH)
6. api/v1/users/bac0d725-cce2-4ddb-83ff-041df4a3a1ff (DELETE)
7. api/v1/profile (GET)

## Category

1. api/v1/categories/create-category (POST)
2. api/v1/categories (GET)
3. api/v1/categories/852710ad-1827-4236-899a-9abc0691ba8e (Single GET)
4. api/v1/categories/852710ad-1827-4236-899a-9abc0691ba8e (PATCH)
5. api/v1/categories/852710ad-1827-4236-899a-9abc0691ba8e (DELETE)

## Books

1. api/v1/books/create-book (POST)
2. api/v1/books (GET)
3. api/v1/books/56be965d-5b43-495c-afa1-8b2cf3fed8c9/category (GET)
4. api/v1/books/e05885c4-2fcb-48b0-a300-797d19397550 (GET SINGLE BOOK)
5. api/v1/books/71de078f-57be-4b1c-a33d-8565aba31d26 (PATCH)
6. api/v1/books/a145960c-8f9f-4a44-a31c-3b379020d6c1 (DELETE)

## Orders

1. api/v1/orders/create-order (POST)
2. api/v1/orders (GET)
3. api/v1/orders/3d331355-d0aa-470e-a52f-2de6e0f447f8 (GET)

{
"orderedBooks": [
{
"bookId": "71de078f-57be-4b1c-a33d-8565aba31d26",
"quantity": 3
}
]
}
