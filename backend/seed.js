import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { Application } from "./models/application.model.js";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}

const seedData = async () => {
    await connectDB();

    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log("Creating Users...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const recruiter = await User.create({
        fullname: "Recruiter John",
        email: "recruiter@test.com",
        phoneNumber: "9876543210",
        password: hashedPassword,
        role: "recruiter",
        profile: {
            bio: "Experienced HR Manager",
            skills: ["Hiring", "Management"],
            profilePhoto: "https://avatar.iran.liara.run/public/boy?username=recruiter"
        }
    });

    const student = await User.create({
        fullname: "Student Alex",
        email: "student@test.com",
        phoneNumber: "1234567890",
        password: hashedPassword,
        role: "student",
        profile: {
            bio: "Full Stack Developer",
            skills: ["React", "Node.js", "MongoDB"],
            profilePhoto: "https://avatar.iran.liara.run/public/boy?username=student"
        }
    });

    console.log("Creating Companies...");
    const companies = await Company.insertMany([
        {
            name: "Google",
            description: "Search Engine Giant",
            website: "https://google.com",
            location: "Mountain View, CA",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
            userId: recruiter._id
        },
        {
            name: "Microsoft",
            description: "Software Corp",
            website: "https://microsoft.com",
            location: "Redmond, WA",
            logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            userId: recruiter._id
        },
        {
            name: "Amazon",
            description: "E-commerce & Cloud",
            website: "https://amazon.com",
            location: "Seattle, WA",
            logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            userId: recruiter._id
        },
        {
            name: "Meta",
            description: "Social Media",
            website: "https://meta.com",
            location: "Menlo Park, CA",
            logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
            userId: recruiter._id
        }
    ]);

    console.log("Creating Jobs...");
    const jobs = await Job.insertMany([
        {
            title: "Frontend Developer",
            description: "We are looking for a React expert to join our team. Must have 3+ years of experience in building responsive web applications.",
            requirements: ["React", "Redux", "TailwindCSS"],
            salary: 120000,
            experienceLevel: 3,
            location: "Remote",
            jobType: "Full Time",
            position: 2,
            company: companies[0]._id,
            created_by: recruiter._id
        },
        {
            title: "Backend Engineer",
            description: "Join our cloud infrastructure team. Experience with Node.js and AWS is required.",
            requirements: ["Node.js", "Express", "AWS", "MongoDB"],
            salary: 140000,
            experienceLevel: 4,
            location: "Seattle, WA",
            jobType: "Full Time",
            position: 1,
            company: companies[2]._id,
            created_by: recruiter._id
        },
        {
            title: "Product Designer",
            description: "Design intuitive user interfaces for our billions of users.",
            requirements: ["Figma", "UI/UX", "Prototyping"],
            salary: 110000,
            experienceLevel: 2,
            location: "Mountain View, CA",
            jobType: "Contract",
            position: 1,
            company: companies[0]._id,
            created_by: recruiter._id
        },
        {
            title: "Data Scientist",
            description: "Analyze large datasets to improve our recommendation algorithms.",
            requirements: ["Python", "Pandas", "Machine Learning"],
            salary: 160000,
            experienceLevel: 5,
            location: "Redmond, WA",
            jobType: "Full Time",
            position: 3,
            company: companies[1]._id,
            created_by: recruiter._id
        },
        {
            title: "DevOps Engineer",
            description: "Manage CI/CD pipelines and cloud infrastructure.",
            requirements: ["Docker", "Kubernetes", "Azure"],
            salary: 130000,
            experienceLevel: 3,
            location: "Remote",
            jobType: "Part Time",
            position: 1,
            company: companies[3]._id,
            created_by: recruiter._id
        },
        {
            title: "SDE I",
            description: "Entry level software development engineer role.",
            requirements: ["Java", "DSA", "Problem Solving"],
            salary: 95000,
            experienceLevel: 0,
            location: "Bangalore, India",
            jobType: "Full Time",
            position: 10,
            company: companies[2]._id,
            created_by: recruiter._id
        }
    ]);

    console.log("Creating Applications...");
    await Application.create({
        job: jobs[0]._id,
        applicant: student._id,
        status: "pending"
    });
    await Application.create({
        job: jobs[1]._id,
        applicant: student._id,
        status: "accepted"
    });

    console.log("Database seeded successfully!");
    process.exit(0);
}

seedData();
