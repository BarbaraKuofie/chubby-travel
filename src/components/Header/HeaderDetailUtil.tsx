import * as React from 'react';
import Tab from '@mui/material/Tab';
import logo from '../assets/logo.png';
import ChubbyProperties from '../ChubbyProperties/ChubbyProperties';
import Submissions from '../Submissions/Submissions';
import Reviews from '../Reviews/Reviews';

export const CHUBBY_PROPERTIES = 'Chubby ProperTies';
export const FAT_PROPERTIES = 'Fat ProperTies';
export const CHUBBY_REVIEWS = 'Chubby Reviews';
export const SUBMISSIONS = 'Submissions';
export const GALLERY = 'Gallery';

export const tabs: string[] = [GALLERY, CHUBBY_PROPERTIES, FAT_PROPERTIES, CHUBBY_REVIEWS, SUBMISSIONS];
export const renderContent = (name: string, index: number) => {
       switch (name) {
           case GALLERY:
               return (
                   <Tab key={index} icon={<img src={logo} alt="logo" style={{ height: '30px', width: 'auto' }} />} iconPosition="start" />
           )
           case CHUBBY_PROPERTIES:
               return (
                   <Tab key={index} label={name}  />
           )
           case FAT_PROPERTIES:
               return (
                   <Tab key={index} label={name} />
           )
           case CHUBBY_REVIEWS:
               return (
                   <Tab key={index} label={name} />
           )
           case SUBMISSIONS:
               return (
                   <Tab key={index} label={name} />
           )
         break;
       }

   }

  export const renderTabPanelChildren = (value: number) => {
      switch (value) {
          case 0:
              return (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
                    <iframe
                      width="100%"
                      height="600"
                      src="https://www.youtube.com/embed/wGQvRDfrtWE?autoplay=1"
                      title="Luxurious Hotel Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ borderRadius: '8px' }}
                    ></iframe>
                  </div>
              )
          case 1:
              return (
                    <ChubbyProperties />
              )
          case 2:
              return (
                 <div>ChubbyProperties</div>
              )
          case 3:
              return (
                <Reviews />
              )
          case 4:
              return (
                  <Submissions />
              )
          break;

      }
  }