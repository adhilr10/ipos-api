import express from 'express';
import cors from 'cors';

// Import your routes
import userRoutes from './routes/user';
import unitRoutes from './routes/unit';
import customerRoutes from './routes/customer';
import supplierRoutes from './routes/supplier';
import shopRoutes from './routes/shop';
import brandRoutes from './routes/brand';
import categoryRoutes from './routes/category';
import productRoutes from './routes/product';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Test route to verify API is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Export the app for Vercel
export default app;
