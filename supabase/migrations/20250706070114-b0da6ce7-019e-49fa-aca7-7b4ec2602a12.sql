-- Insert past events from previous hardcoded data
INSERT INTO public.events (
  title, 
  description, 
  event_type, 
  event_date, 
  venue, 
  status, 
  max_participants, 
  current_participants,
  featured_image_url
) VALUES 
(
  'WarP Intra ''24',
  'Annual intra-school programming competition featuring competitive coding challenges, algorithm contests, and technical skill assessments. Students competed in various programming languages and problem-solving scenarios.',
  'Intra School Competition',
  '2024-08-15 10:00:00+00:00',
  'Computer Lab 1, Senior School Building',
  'completed',
  150,
  142,
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop'
),
(
  'WarP Intra ''23',
  'Third edition of our flagship intra-school competition with programming contests, hackathon challenges, and tech presentations. Featured multiple rounds of coding competitions and innovative project showcases.',
  'Intra School Competition', 
  '2023-08-20 09:30:00+00:00',
  'Computer Lab 2, Senior School Building',
  'completed',
  120,
  118,
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop'
),
(
  'WarP Inter ''23',
  'Inter-school technology competition bringing together talented students from multiple schools. Featured team-based programming challenges, cybersecurity CTF, and collaborative tech projects.',
  'Inter School Competition',
  '2023-10-12 11:00:00+00:00', 
  'Main Auditorium, Senior School Building',
  'completed',
  200,
  185,
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=300&fit=crop'
),
(
  'WarP Intra ''22',
  'Second annual intra-school programming competition with enhanced challenges and new categories. Included web development contests, AI/ML workshops, and competitive programming rounds.',
  'Intra School Competition',
  '2022-09-05 10:30:00+00:00',
  'Computer Lab 1 & 2, Senior School Building', 
  'completed',
  100,
  96,
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop'
),
(
  'WarP Inter ''22', 
  'First inter-school competition organized by WarP Computer Club. Multi-school participation with programming contests, tech exhibitions, and knowledge sharing sessions among young tech enthusiasts.',
  'Inter School Competition',
  '2022-11-18 09:00:00+00:00',
  'Main Auditorium, Senior School Building',
  'completed', 
  160,
  152,
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=300&fit=crop'
);

-- Also insert the upcoming event that was mentioned
INSERT INTO public.events (
  title,
  description, 
  event_type,
  event_date,
  venue,
  status,
  max_participants,
  current_participants,
  featured_image_url,
  registration_link
) VALUES (
  'WarP Intra ''25',
  'The biggest and most exciting edition of our annual intra-school competition! Features competitive programming, hackathons, cybersecurity CTF challenges, AI/ML workshops, and much more. Join us for a day of coding, innovation, and tech excellence.',
  'Intra School Competition',
  '2025-08-02 09:00:00+00:00',
  'Computer Labs & Main Auditorium, Senior School Building', 
  'upcoming',
  200,
  0,
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=300&fit=crop',
  null
);