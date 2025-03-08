import axios from 'axios';

// Types
export interface UserData {
  name: string;
  bio: string;
  skills: string;
  resume?: File;
}

export interface GeneratedPortfolio {
  id: string;
  templateId: string;
  name: string;
  previewImage: string;
  description: string;
  portfolioUrl: string;
}

// Mock function for development
function getMockPortfolios(userData: UserData): GeneratedPortfolio[] {
  return [
    {
      id: "p1",
      templateId: "1",
      name: "Minimalist Portfolio",
      previewImage: "",
      description: `A clean portfolio for ${userData.name} focused on their skills in ${userData.skills}`,
      portfolioUrl: "/portfolio/p1"
    },
    {
      id: "p2",
      templateId: "2",
      name: "Creative Portfolio",
      previewImage: "",
      description: `A bold, creative showcase highlighting ${userData.name}'s work and experience`,
      portfolioUrl: "/portfolio/p2"
    },
    {
      id: "p3",
      templateId: "3",
      name: "Developer Portfolio",
      previewImage: "",
      description: `Technical portfolio showcasing ${userData.name}'s projects and coding skills`,
      portfolioUrl: "/portfolio/p3"
    }
  ];
}

// Portfolio generation API call
export const generatePortfolios = async (userData: UserData): Promise<GeneratedPortfolio[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For testing, return mock data
    return getMockPortfolios(userData);
    
    // Real API call for production:
    /*
    const API_BASE_URL = 'https://portfolio-builder-three.vercel.app/api';
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('bio', userData.bio);
    formData.append('skills', userData.skills);
    
    if (userData.resume) {
      formData.append('resume', userData.resume);
    }
    
    const response = await axios.post(`${API_BASE_URL}/portfolios/generate`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    return response.data.portfolios;
    */
  } catch (error) {
    console.error('Error generating portfolios:', error);
    throw error;
  }
};

// Get portfolio by ID
export const getPortfolioById = async (id: string): Promise<GeneratedPortfolio> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data based on ID
    return {
      id,
      templateId: id.includes("p1") ? "1" : id.includes("p2") ? "2" : "3",
      name: id.includes("p1") ? "Minimalist Portfolio" : id.includes("p2") ? "Creative Portfolio" : "Developer Portfolio",
      previewImage: "",
      description: "This is a sample portfolio generated for demonstration.",
      portfolioUrl: `/portfolio/${id}`
    };
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
};