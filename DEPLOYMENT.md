# 🚀 Deployment Guide

This guide will help you deploy the School Management API to various hosting platforms.

## 📋 Prerequisites

- Node.js application ready for deployment
- MySQL database (local or cloud)
- Git repository
- Environment variables configured

## 🌐 Deployment Options

### 1. Railway (Recommended for Beginners)

**Pros**: Easy deployment, built-in database, free tier available
**Cons**: Limited free tier resources

#### Steps:
1. **Sign up** at [railway.app](https://railway.app)
2. **Connect** your GitHub repository
3. **Add MySQL** service from the marketplace
4. **Set environment variables**:
   ```env
   NODE_ENV=production
   PORT=3000
   DB_HOST=your_railway_mysql_host
   DB_USER=your_railway_mysql_user
   DB_PASSWORD=your_railway_mysql_password
   DB_NAME=your_railway_mysql_database
   DB_PORT=3306
   ```
5. **Deploy** - Railway will automatically build and deploy your app

### 2. Heroku

**Pros**: Reliable, good free tier, easy scaling
**Cons**: Free tier discontinued, requires credit card

#### Steps:
1. **Install Heroku CLI** and login
2. **Create app**: `heroku create your-app-name`
3. **Add MySQL addon**: `heroku addons:create jawsdb:kitefin`
4. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DB_HOST=your_jawsdb_host
   heroku config:set DB_USER=your_jawsdb_user
   heroku config:set DB_PASSWORD=your_jawsdb_password
   heroku config:set DB_NAME=your_jawsdb_database
   heroku config:set DB_PORT=3306
   ```
5. **Deploy**: `git push heroku main`

### 3. DigitalOcean App Platform

**Pros**: Good performance, reasonable pricing, managed platform
**Cons**: No free tier

#### Steps:
1. **Sign up** at [digitalocean.com](https://digitalocean.com)
2. **Create app** from your GitHub repository
3. **Add database** service (Managed MySQL)
4. **Configure environment variables** in the app settings
5. **Deploy** - DigitalOcean handles the rest

### 4. AWS (Advanced)

**Pros**: Highly scalable, many services, enterprise-grade
**Cons**: Complex setup, can be expensive

#### Steps:
1. **Launch EC2 instance** (t2.micro for free tier)
2. **Install Node.js** and MySQL
3. **Set up security groups** (open ports 22, 80, 443, 3000)
4. **Clone repository** and install dependencies
5. **Set up PM2** for process management
6. **Configure Nginx** as reverse proxy
7. **Set up SSL** with Let's Encrypt

## 🔧 Environment Configuration

### Production Environment Variables

```env
NODE_ENV=production
PORT=3000
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
DB_PORT=3306
```

### Database Setup

1. **Create production database**:
   ```sql
   CREATE DATABASE school_management_prod;
   ```

2. **Run initialization script**:
   ```bash
   mysql -h your_host -u your_user -p school_management_prod < src/DB/init-db.sql
   ```

## 📊 Performance Optimization

### 1. Database Indexes
```sql
-- Add indexes for better performance
CREATE INDEX idx_coordinates ON schools(latitude, longitude);
CREATE INDEX idx_name ON schools(name);
```

### 2. Connection Pooling
The application already uses connection pooling with MySQL2.

### 3. Caching (Optional)
Consider adding Redis for caching frequently accessed data.

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env` files to version control
- Use strong, unique passwords for production databases
- Rotate database credentials regularly

### 2. Database Security
- Use dedicated database users with minimal privileges
- Enable SSL connections if supported
- Restrict database access to application servers only

### 3. API Security
- Consider adding rate limiting
- Implement authentication if needed
- Use HTTPS in production

## 📈 Monitoring and Logging

### 1. Application Monitoring
- **Railway/Heroku**: Built-in monitoring dashboards
- **DigitalOcean**: App platform monitoring
- **AWS**: CloudWatch metrics

### 2. Database Monitoring
- Monitor connection pool usage
- Track query performance
- Set up alerts for high CPU/memory usage

### 3. Logging
The application includes comprehensive logging for debugging.

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check database credentials
   - Verify database is accessible from deployment platform
   - Check firewall/security group settings

2. **Port Issues**
   - Ensure PORT environment variable is set correctly
   - Check if port is open in security groups

3. **Build Failures**
   - Verify Node.js version compatibility
   - Check for missing dependencies
   - Review build logs

### Debug Commands

```bash
# Check application logs
heroku logs --tail  # Heroku
railway logs        # Railway

# Check database connection
railway run mysql -h $DB_HOST -u $DB_USER -p $DB_NAME

# Test API endpoints
curl https://your-app.railway.app/health
```

## 📞 Support

- **Railway**: [Discord community](https://discord.gg/railway)
- **Heroku**: [Support documentation](https://devcenter.heroku.com)
- **DigitalOcean**: [Community tutorials](https://www.digitalocean.com/community)
- **AWS**: [Documentation](https://docs.aws.amazon.com)

---

**Happy Deploying! 🎉**

