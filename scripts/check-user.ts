import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Checking admin user...')
  
  const user = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  })

  if (!user) {
    console.log('❌ Admin user not found!')
    console.log('Creating admin user...')
    
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const newUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      },
    })
    console.log('✅ Admin user created:', newUser.email)
  } else {
    console.log('✅ Admin user found:', user.email)
    console.log('Testing password...')
    
    const isValid = await bcrypt.compare('admin123', user.password)
    if (isValid) {
      console.log('✅ Password is correct!')
    } else {
      console.log('❌ Password mismatch!')
      console.log('Resetting password...')
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })
      console.log('✅ Password reset!')
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

