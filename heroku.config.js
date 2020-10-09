module.exports = {
  apps: [
    {
      name: 'PH ' + process.env.LABEL,
      script: 'dist/main.js',
      instances: process.env.INSTANCES || '1',
      max_memory_restart: process.env.MEMORY || '256M',
      cwd: './',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
