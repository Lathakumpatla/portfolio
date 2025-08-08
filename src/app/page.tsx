'use client';

import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  Stack,
  useTheme,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgressProps,
  Link,
  IconButton,
  Fab,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../components/Header'; 
import InstagramIcon from '@mui/icons-material/Instagram';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; 
import { useEffect, useRef, useState } from 'react';
import { keyframes, useMediaQuery } from '@mui/system';
import Preloader from '@/components/preloader';
import { BackgroundElements } from '@/components/BackgroundElements';
import { useSelector } from 'react-redux';

const flipAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const Home = () => {
  const theme = useTheme();
  const contactRef = useRef<HTMLDivElement>(null);
   const mode = useSelector((state: any) => state.theme.mode);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [flip, setFlip] = useState(false);
  const phrase = '"Web & Mobile Application Developer"';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;

    const startAnimation = () => {
      setFlip(true);
      timeout1 = setTimeout(() => {
        setFlip(false); 
        timeout2 = setTimeout(startAnimation, 1000); 
      }, 4000); 
    };

    startAnimation(); 

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "Gcrs-Company Website",
      description: "Created an interactive Rock-Paper-Scissors game with HTML, CSS, and JavaScript. This project was a great learning experience in building dynamic web applications.",
      imageSrc: "gcrswebsite.png",
    },
    {
      title: "Landscape Health Monitoring Tool – (GeoSust)",
      description: "An interactive map-based tool for industrial sustainability. Users can upload or draw boundaries, screen environments, and manage data. Includes dashboards, layer toggling, and zoom features. Helps industries monitor and enhance sustainability efforts.",
      imageSrc: "industry.png",
    },
    {
      title: "Lake Management System (LAMAS)",
      description: "Lake Management System (LAMAS), WebGIS tools, Water Sector sustainability analysis",
      imageSrc: "lamas.png",
    },
    {
      title: "Development of Geoportal for Spatial Information Storage and Exchange, Spatial Data Infrastructure",
      description: "Delivering climate services to Tajikistan by enabling disaster monitoring and building a growing community committed to climate resilience and risk reduction.",
      imageSrc: "sdi.png",
    },
    {
      title: "Clean Tech - Mobile Application",
      description: "Developed and maintained a mobile application using React Native to track and display sustainability performance metrics. Implemented interactive UI components, integrated APIs for real-time data updates, and ensured cross-platform compatibility to support WWF-India's clean tech initiatives.",
      imageSrc: "cleantech.png",
    },
    {
      title: "Kondakarla AVA Mobile Application",
      description: "Ticket Booking and Notifications, Kondakarla Ava mitra mobile platform is a user friendly mobile -application designed to explore the wetland React Native Developer",
      imageSrc: "kondakarla.png",
    },
  ];

  if (loading) return <Preloader />;

  return (
    <Box sx={{ 
      bgcolor: theme.palette.background.default, 
      minHeight: '100vh',
      position: 'relative',
  
    }}>
      <Header  />
      
     {!isMobile && (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: showBackground ? 1 : 0 }}
    transition={{ duration: 0.5 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
    }}
  >
    <BackgroundElements />
  </motion.div>
)}


     <Container
  maxWidth="lg"
  sx={{
    py: 8,
    position: 'relative',
    zIndex: 1,
    marginLeft: isMobile ? '0' : '250px',
    width: isMobile ? '100%' : 'calc(100% - 250px)',
  }}
>
        {/* Hero Section */}
        <Box
          sx={{
            minHeight: 'calc(100vh - 80px)', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            px: 2,
            pl: { xs: 2, sm: 6, md: 12, lg: 24, xl: 30 }, 
          }}
        >
          <Avatar
            src="/avtar.webp"
            alt="Latha Kumpatla"
            sx={{
              width: 150,
              height: 150,
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              objectFit: 'cover',
              backgroundColor: 'transparent',
            }}
          />

          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontSize: 40 }}>
            Latha Kumpatla
          </Typography>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="subtitle1">I'm a&nbsp;</Typography>
            <Box
              sx={{
                display: 'inline-block',
                perspective: '1000px',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  display: 'inline-block',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s',
                  transform: flip ? 'rotateX(360deg)' : 'rotateX(0deg)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {phrase}
              </Typography>
            </Box>
          </Box>

          {/* Social Icons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
            <IconButton
              component="a"
              href="https://www.instagram.com/your-username" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://www.linkedin.com/in/latha-kumpatla-912188228/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </IconButton>

            <IconButton
              component="a"
              href="https://github.com/Lathakumpatla" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={scrollToContact}
            sx={{
              borderRadius: '30px',
              padding: '7px 24px',
            }}
          >
            Contact me
          </Button>
        </Box>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box id="about" sx={{ pl: { xs: 4, sm: 6, md: 8 } ,pt:3}}>
            <Typography variant="h4" sx={{ color: theme.palette.text.primary, mb: 2 }}>
              About Me
            </Typography>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography variant="body1" color="text.secondary" sx={{ wordWrap: 'break-word' }}>
                <strong>Web & Mobile Application Developer</strong> with a passion for building
                <strong> GIS platforms</strong> focused on <strong>sustainability and environmental monitoring</strong>.
                My expertise lies in developing <strong>WebGIS solutions using React, TypeScript, and MUI</strong>,
                and crafting <strong>mobile applications with React Native</strong> for critical field data
                collection and community engagement. I specialize in integrating geospatial
                services (WMS/WFS from GeoServer), creating interactive dashboards with
                spatial insights, and ensuring robust data quality. I'm driven by the
                desire to leverage modern web mapping libraries and cloud-based GIS tools
                to create impactful solutions.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        {/* Skills & Tools Section */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Box mt={12} id="skills" sx={{ pl: { xs: 4, sm: 6, md: 8 } }}>
            <Typography variant="h4" sx={{ color: theme.palette.text.primary, mb: 2 }}>
              Skills & Tools
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {/* Programming Languages */}
              <Box sx={{
                flex: '1 1 300px',
                maxWidth: '450px',
                p: 3,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #9c27b0, #1b1b3a)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <Typography variant="h5" sx={{ color: '#ffffff', mb: 3 }}>
                  Programming Languages
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer', 
                    }}
                  >
                    <Box component="img" src="html5.png" alt="HTML5" sx={{ width: 60, height: 60, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>HTML5</Typography>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="css3.png" alt="CSS3" sx={{ width: 60, height: 60, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>CSS3</Typography>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="js.png" alt="Javascript" sx={{ width: 70, height: 50, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>Javascript</Typography>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="ts.png" alt="TypeScript" sx={{ width: 40, height: 40, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>TypeScript</Typography>
                  </motion.div>
                </Box>
              </Box>

              {/* Tools & Technologies */}
              <Box sx={{
                flex: '1 1 300px',
                maxWidth: '450px',
                p: 3,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #9c27b0, #1b1b3a)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <Typography variant="h5" sx={{color: '#ffffff', mb: 3 }}>
                  Tools & Technologies
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="github.png" alt="GitHub" sx={{ width: 120, height: 60, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>GitHub</Typography>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="vscode.png" alt="VS Code" sx={{ width: 60, height: 60, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>VS Code</Typography>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="react.png" alt="React" sx={{ width: 60, height: 60, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>React</Typography>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="react.png" alt="React Native" sx={{ width: 60, height: 60, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>React Native</Typography>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="nextjs.webp" alt="Next.js" sx={{ width: 60, height: 60, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>Next.js</Typography>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.6)' }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: '100px',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component="img" src="mui.png" alt="MUI" sx={{ width: 60, height: 60, mb: 1 }} />
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>MUI</Typography>
                  </motion.div>
                </Box>
              </Box>
            </Box>
            <SkillsSection/>
          </Box>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box
            mt={12}
            id="experience"
            sx={{
              borderRadius: '16px',
              padding: '24px',
              pl: { xs: 4, sm: 6, md: 8 }
            }}
          >
            <Typography variant="h4" sx={{ color: theme.palette.text.primary, mb: 2 }}>
              My Experience
            </Typography>

            {/* Experience Card */}
            <Box
              sx={{
                borderRadius: '12px',
                padding: '20px',
              }}
            >
<Box
  sx={{
    display: 'flex',
    alignItems: 'flex-start',
    mb: 1,
    flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
  }}
>
  <Typography
    variant="h5"
    sx={{
      color: theme.palette.primary.main,
      mr: { lg: 1, xs: 0 },
    }}
  >
    Geo Climate Risk Solutions Pvt. Ltd.
  </Typography>
  <Typography
    variant="h5"
    sx={{ color: theme.palette.text.primary }}
  >
    (Web & Mobile Application Developer)
  </Typography>
</Box>



              <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                July 2023 – Present
              </Typography>

              <List sx={{ color: theme.palette.text.secondary }}>
                <ListItem sx={{ paddingLeft: 0, paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: theme.palette.success.main }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="As a web and mobile application developer, I design and build GIS platforms focused on sustainability and environmental monitoring."
                  />
                </ListItem>
                <ListItem sx={{ paddingLeft: 0, paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: theme.palette.success.main }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="I develop WebGIS solutions using React, TypeScript, and MUI, and create mobile apps with React Native for field data collection and community engagement."
                  />
                </ListItem>
                <ListItem sx={{ paddingLeft: 0, paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: theme.palette.success.main }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="My work includes integrating geospatial services like WMS and WFS from GeoServer, and collaborating with experts for tools such as hazard maps and biodiversity tracking."
                  />
                </ListItem>
                <ListItem sx={{ paddingLeft: 0, paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: theme.palette.success.main }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="I develop dashboards with interactive charts and spatial insights to aid decision-making."
                  />
                </ListItem>
                <ListItem sx={{ paddingLeft: 0, paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: theme.palette.success.main }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="I manage and process spatial datasets, ensuring data quality and validation with local agencies."
                  />
                </ListItem>
                <ListItem sx={{ paddingLeft: 0, paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemIcon sx={{ minWidth: 'auto', mr: 1, color: theme.palette.success.main }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="I also support platform deployment, training, and documentation. My approach leverages modern web mapping libraries and cloud-based GIS tools."
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
        </motion.div>

        {/* Projects Section */}
        <motion.div
           initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box mt={12} id="projects" sx={{ pl: { xs: 4, sm: 6, md: 8 } }}>
            <Typography
              variant="h4"
              sx={{ color: theme.palette.text.primary, mb: 4, fontWeight: 'bold' }}
            >
              Projects
            </Typography>

            {/* Container: flex row with wrap */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 3,
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 'calc(33.33% - 20px)',
                    minWidth: '280px',
                    marginBottom: '24px',
                  }}
                >
                  <Paper
                    sx={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor:
                        theme.palette.mode === 'dark' ? '#1c1c1c' : '#ffffff',
                      boxShadow:
                        theme.palette.mode === 'dark'
                          ? '8px 8px 16px #121212, -8px -8px 16px #262626'
                          : '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }}
                  >
                    <Box
                      sx={{
                        height: '180px',
                        overflow: 'hidden',
                        backgroundColor:
                          theme.palette.mode === 'dark' ? '#0d0d0d' : '#f0f0f0',
                      }}
                    >
                      <img
                        src={project.imageSrc}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                    <Box sx={{ p: 2, flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: theme.palette.text.primary,
                          mb: 1,
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary, mb: 2 }}
                      >
                        {project.description}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Education & Address Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box mt={12} id="education" sx={{ pl: { xs: 4, sm: 6, md: 8 } }}> 
            <EducationTimeline/>
          </Box>
        </motion.div>

        {/* Contact Section */}
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </Container>
      
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScroll ? 1 : 0, scale: showScroll ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollTop}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1000,
            transition: 'opacity 0.3s, transform 0.3s',
            boxShadow: theme.shadows[6],
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      </motion.div>
    </Box>
  );
};

export default Home;

// Reusable Project Card component
interface ProjectCardProps {
  title: string;
  description: string;
}

const ProjectCard = ({ title, description }: ProjectCardProps) => {
  const theme = useTheme();

  return (
    <Box
      p={3}
      borderRadius={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: 2,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }} gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
    </Box>
  );
};

// SkillsSection Component
const SkillsSection = () => {
  const theme = useTheme();

  const skillsData = [
    { name: 'HTML 5', percentage: 100, color: '#ff9800' },
    { name: 'JavaScript', percentage: 95, color: '#ffeb3b' },
    { name: 'CSS', percentage: 95, color: '#4285f4' },
    { name: 'ReactJs', percentage: 88, color: '#80d8ff' },
    { name: 'React Native', percentage: 95, color: '#8bc34a' },
    { name: 'Git', percentage: 90, color: '#f1502f' },
    { name: 'Next.js', percentage: 85, color: '#000000' },
    { name: 'MUI', percentage: 90, color: '#007fff' },
  ];
  const [progress, setProgress] = useState(skillsData.map(() => 0));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) =>
        prev.map((val, i) =>
          val < skillsData[i].percentage ? val + 1 : val
        )
      );
    }, 15);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <Box
        mt={12}
        id="detailed-skills"
        sx={{
          p: 4,
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #1b1b3a, #0a0a1a)',
          color: theme.palette.text.primary,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Typography variant="h4" sx={{ color: '#ffffff', mb: 4, textAlign: 'center' }}>
          Technical Expertise
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            maxWidth: '900px',
            mx: 'auto',
          }}
        >
          {skillsData.map((skill, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1">{skill.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {progress[index]}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress[index]}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: skill.color,
                  },
                  transition: "all 0.3s ease",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </motion.div>
  );
};

const EducationTimeline = () => {
  const theme = useTheme();

  const TimelineContainer = styled(Box)({
    position: "relative",
    width: "100%",
    padding: "40px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: "20px",
      bottom: "0",
      width: "2px",
      backgroundColor: theme.palette.primary.main,
      zIndex: 1,
    },
  });

  const TimelineItem = styled(Box)({
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: theme.spacing(4),
    paddingLeft: "60px",
    zIndex: 2,
    width: "100%",
  });

  const TimelineDot = styled(Box)({
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.background.default}`,
    position: "absolute",
    left: "13px",
    top: "5px",
    zIndex: 3,
  });

  const IconContainer = styled(Box)({
    position: "absolute",
    left: "0",
    top: "0",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  });

  const DescriptionBox = styled(Box)({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    textAlign: "left",
    flexGrow: 1,
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[3],
  });

  const YearText = styled(Typography)({
    color: theme.palette.text.primary,
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  });

  const CGPAContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
    width: "100%",
  });

  interface StyledLinearProgressProps extends LinearProgressProps {
    barcolor: string;
  }

  const StyledLinearProgress = styled(LinearProgress)<StyledLinearProgressProps>(
    ({ barcolor }) => ({
      height: 8,
      borderRadius: 5,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      flexGrow: 1,
      "& .MuiLinearProgress-bar": {
        backgroundColor: barcolor,
        transition: "transform 0.8s ease, width 0.8s ease", // smooth animation
      },
    })
  );

  const educationData = [
    {
      years: "2019 - 2023",
      degree: "B.Tech",
      institution:
        "Rajiv Gandhi University Of Knowledge and Technologies, Ongole",
      cgpa: "9.2",
      totalCgpa: 10,
      barColor: "#f57c00",
    },
    {
      years: "2017 - 2019",
      degree: "Pre University Course",
      institution:
        "Rajiv Gandhi University Of Knowledge and Technologies, Ongole",
      cgpa: "8.39",
      totalCgpa: 10,
      barColor: "#4caf50",
    },
    {
      years: "2016 - 2017",
      degree: "10th",
      institution: "ZPHS, Cherukuru",
      additionalInfo: "Secondary School Certificate (SSC)",
      cgpa: "9.8",
      totalCgpa: 10,
      barColor: "#2196f3",
    },
  ];

  // Track animated values
  const [progressValues, setProgressValues] = useState(
    Array(educationData.length).fill(0)
  );

  useEffect(() => {
    const animation = setInterval(() => {
      setProgressValues((prev) =>
        prev.map((val, i) => {
          const target =
            (parseFloat(educationData[i].cgpa) /
              educationData[i].totalCgpa) *
            100;
          return val < target ? val + 2 : target; // speed of animation
        })
      );
    }, 30);

    return () => clearInterval(animation);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "80vh",
        color: "white",
        // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography variant="h4" sx={{ mb: 6, color: "white", fontWeight: 600 }}>
        Education
      </Typography>

      <TimelineContainer>
        {educationData.map((item, index) => (
          <TimelineItem key={index}>
            <IconContainer>
              <SchoolIcon sx={{ color: "white", fontSize: 20 }} />
            </IconContainer>
            <TimelineDot />
            <DescriptionBox>
              <YearText variant="body2">{item.years}</YearText>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                }}
              >
                {item.degree}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {item.institution}
              </Typography>
              {item.additionalInfo && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {item.additionalInfo}
                </Typography>
              )}
              <CGPAContainer>
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                  <StyledLinearProgress
                    variant="determinate"
                    value={progressValues[index]}
                    barcolor={item.barColor}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  {item.cgpa} CGPA
                </Typography>
              </CGPAContainer>
            </DescriptionBox>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </Box>
  );
};

const navigationLinks = [
  { name: 'About me', href: '#about' },
  { name: 'Skills & Tools', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
];

const socialLinks = [
  { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/latha-kumpatla-912188228/' },
  { icon: <WhatsAppIcon />, href: 'https://wa.me/916301774138' },
  { icon: <PhoneIcon />, href: 'tel:916301774138' }, 
  { icon: <MailOutlineIcon />, href: 'mailto:kumpatlalatha3@gmail.com' },
];

const ContactSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        py: 8,
        textAlign: 'center',
        color: theme.palette.text.primary,
        fontFamily: 'sans-serif', 
        pl: { xs: 2, sm: 6, md: 12, lg: 24, xl: 30 }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Typography variant="h3" component="h1" mb={2}>
          Contact me
        </Typography>

        <Typography
          variant="h6"
          sx={{
            background: 'linear-gradient(45deg, #FF66FF 30%, #6666FF 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 6,
          }}
        >
          Feel free to reach out me for any questions and opportunities!
        </Typography>

        {/* Navigation Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 2, sm: 4 },
            mb: 6,
            flexWrap: 'wrap',
          }}
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {link.name}
            </Link>
          ))}
        </Box>

        {/* Social Icons */}
        <Box sx={{ mb: 4 }}>
          {socialLinks.map((link, index) => (
            <IconButton
              key={index}
              href={link.href}
              target="_blank"
              sx={{
                mx: 1,
                color: theme.palette.text.primary,
                '&:hover': {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {link.icon}
            </IconButton>
          ))}
        </Box>

        {/* Footer Text */}
        <Box mt={4}>
          <Typography variant="body1" color="text.primary" mb={1}>
            Designed & Developed by Latha Kumpatla
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © 2025 Latha Kumpatla. All rights reserved.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};