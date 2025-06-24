import { CustomerSupportAgent } from "@neon/core-agents";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const supportRouter = createTRPCRouter({
  sendWhatsAppMessage: publicProcedure
    .input(z.object({
      recipient: z.string(),
      message: z.object({
        type: z.enum(['text', 'image', 'document', 'template']),
        content: z.string(),
        media: z.object({
          url: z.string(),
          caption: z.string().optional(),
          filename: z.string().optional(),
        }).optional(),
        template: z.object({
          name: z.string(),
          language: z.string(),
          parameters: z.array(z.string()).optional(),
        }).optional(),
      }),
      settings: z.object({
        businessId: z.string().optional(),
        accessToken: z.string().optional(),
        webhookUrl: z.string().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      return await supportAgent.sendMessage(input);
    }),

  createTicket: publicProcedure
    .input(z.object({
      ticketId: z.string().optional(),
      customer: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        customerId: z.string().optional(),
      }),
      channel: z.enum(['whatsapp', 'email', 'chat', 'phone', 'social']),
      subject: z.string(),
      message: z.string(),
      priority: z.enum(['low', 'medium', 'high', 'critical']),
      category: z.string().optional(),
      metadata: z.record(z.any()).optional(),
    }))
    .mutation(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      return await supportAgent.createTicket(input);
    }),

  updateTicket: publicProcedure
    .input(z.object({
      ticketId: z.string(),
      update: z.object({
        status: z.enum(['open', 'in_progress', 'pending_customer', 'resolved', 'closed']).optional(),
        priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
        assignedTo: z.string().optional(),
        resolution: z.string().optional(),
        satisfactionScore: z.number().min(1).max(5).optional(),
        customerConfirmed: z.boolean().optional(),
        tags: z.array(z.string()).optional(),
      }),
      agentId: z.string(),
    }))
    .mutation(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      return await supportAgent.execute({
        task: 'update_ticket',
        context: input,
        priority: 'medium'
      });
    }),

  generateAutoResponse: publicProcedure
    .input(z.object({
      message: z.string(),
      customer: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        customerId: z.string().optional(),
      }),
      ticketHistory: z.array(z.any()).optional(),
    }))
    .mutation(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      return await supportAgent.execute({
        task: 'auto_respond',
        context: input,
        priority: 'high'
      });
    }),

  escalateTicket: publicProcedure
    .input(z.object({
      ticketId: z.string(),
      reason: z.string(),
      priority: z.enum(['low', 'medium', 'high', 'critical']),
      requiredSkills: z.array(z.string()).optional(),
      urgency: z.enum(['low', 'medium', 'high']).optional(),
    }))
    .mutation(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      return await supportAgent.execute({
        task: 'escalate_ticket',
        context: input,
        priority: 'high'
      });
    }),

  analyzeSentiment: publicProcedure
    .input(z.object({
      message: z.string(),
    }))
    .mutation(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      return await supportAgent.execute({
        task: 'analyze_sentiment',
        context: input,
        priority: 'low'
      });
    }),

  generateTicketSummary: publicProcedure
    .input(z.object({
      ticketId: z.string(),
    }))
    .query(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      return await supportAgent.execute({
        task: 'generate_summary',
        context: input,
        priority: 'low'
      });
    }),

  manageKnowledgeBase: publicProcedure
    .input(z.object({
      action: z.enum(['add_article', 'update_article', 'search_articles', 'get_suggestions']),
      data: z.any(),
    }))
    .mutation(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      return await supportAgent.execute({
        task: 'manage_knowledge_base',
        context: input,
        priority: 'medium'
      });
    }),

  getTicketAnalytics: publicProcedure
    .input(z.object({
      timeRange: z.object({
        start: z.date(),
        end: z.date(),
      }),
      filters: z.object({
        channel: z.array(z.string()).optional(),
        priority: z.array(z.string()).optional(),
        status: z.array(z.string()).optional(),
        agentId: z.string().optional(),
      }).optional(),
    }))
    .query(async ({ input: _input }) => {
      // Return support analytics (input ignored for mock data)
      return {
        data: {
          totalTickets: 1250,
          resolvedTickets: 1100,
          avgResponseTime: 15, // minutes
          avgResolutionTime: 180, // minutes
          customerSatisfaction: 4.2,
          channelBreakdown: {
            whatsapp: 45,
            email: 30,
            chat: 15,
            phone: 8,
            social: 2,
          },
          priorityBreakdown: {
            low: 35,
            medium: 45,
            high: 15,
            critical: 5,
          },
          resolutionRate: 88,
          escalationRate: 12,
          topCategories: [
            { category: 'Technical Issues', count: 350 },
            { category: 'Billing Questions', count: 280 },
            { category: 'Account Management', count: 220 },
            { category: 'Product Information', count: 180 },
            { category: 'General Inquiry', count: 120 },
          ],
        },
      };
    }),

  getSupportAgents: publicProcedure
    .query(async () => {
      // Return list of available support agents
      return {
        data: [
          {
            id: 'agent_001',
            name: 'Sarah Johnson',
            email: 'sarah@company.com',
            skills: ['Technical Support', 'Billing', 'Account Management'],
            status: 'online',
            currentTickets: 8,
            maxTickets: 15,
            avgResolutionTime: 120, // minutes
            satisfactionRating: 4.7,
          },
          {
            id: 'agent_002',
            name: 'Mike Chen',
            email: 'mike@company.com',
            skills: ['Product Support', 'Technical Issues', 'Integration Help'],
            status: 'online',
            currentTickets: 12,
            maxTickets: 20,
            avgResolutionTime: 95,
            satisfactionRating: 4.5,
          },
          {
            id: 'agent_003',
            name: 'Emily Rodriguez',
            email: 'emily@company.com',
            skills: ['Customer Success', 'Onboarding', 'Training'],
            status: 'busy',
            currentTickets: 6,
            maxTickets: 12,
            avgResolutionTime: 150,
            satisfactionRating: 4.8,
          },
        ],
      };
    }),

  getWhatsAppTemplates: publicProcedure
    .query(async () => {
      // Return available WhatsApp message templates
      return {
        data: [
          {
            id: 'welcome_new_customer',
            name: 'Welcome New Customer',
            language: 'en',
            category: 'ACCOUNT_UPDATE',
            status: 'APPROVED',
            components: [
              {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Welcome to {{1}}!',
              },
              {
                type: 'BODY',
                text: 'Hi {{1}}, thank you for joining us. Your account has been created successfully.',
              },
              {
                type: 'FOOTER',
                text: 'Questions? Reply to this message.',
              },
            ],
          },
          {
            id: 'order_confirmation',
            name: 'Order Confirmation',
            language: 'en',
            category: 'ACCOUNT_UPDATE',
            status: 'APPROVED',
            components: [
              {
                type: 'HEADER',
                format: 'TEXT',
                text: 'Order Confirmed',
              },
              {
                type: 'BODY',
                text: 'Your order {{1}} has been confirmed. Total: ${{2}}. Expected delivery: {{3}}.',
              },
            ],
          },
        ],
      };
    }),

  getTicket: publicProcedure
    .input(z.object({
      ticketId: z.string(),
    }))
    .query(async ({ input }) => {
      // Return specific ticket details with conversation history
      return {
        ticket: {
          id: input.ticketId,
          customer: {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            phone: '+1-555-0123',
            avatar: null,
          },
          subject: 'Issue with AI Content Generator',
          status: 'open',
          priority: 'medium',
          channel: 'whatsapp',
          escalated: false,
          createdAt: new Date('2024-01-16T09:00:00Z'),
          messages: [
            {
              id: '1',
              sender: 'customer',
              content: 'Hi, I\'m having trouble with the AI content generator. It keeps giving me generic responses.',
              timestamp: new Date('2024-01-16T09:00:00Z'),
              type: 'text',
            },
            {
              id: '2',
              sender: 'ai',
              content: 'Hello Sarah! I understand you\'re experiencing issues with the AI content generator. Let me help you troubleshoot this. Can you tell me what type of content you\'re trying to generate?',
              timestamp: new Date('2024-01-16T09:02:00Z'),
              type: 'text',
            },
            {
              id: '3',
              sender: 'customer',
              content: 'I\'m trying to create social media posts for my restaurant, but the suggestions are too generic and don\'t capture my brand voice.',
              timestamp: new Date('2024-01-16T09:05:00Z'),
              type: 'text',
            },
            {
              id: '4',
              sender: 'ai',
              content: 'I see the issue. For more personalized content, try providing more specific details about your restaurant\'s style, target audience, and unique selling points in the prompt. Would you like me to guide you through creating a better prompt template?',
              timestamp: new Date('2024-01-16T09:07:00Z'),
              type: 'text',
            },
          ],
        }
      };
    }),

  sendMessage: publicProcedure
    .input(z.object({
      ticketId: z.string(),
      content: z.string(),
      type: z.enum(['text', 'image', 'file']).default('text'),
      senderId: z.string(),
    }))
    .mutation(async ({ input }) => {
      const supportAgent = new CustomerSupportAgent();
      
      // Send the message
      const result = await supportAgent.execute({
        task: 'send_message',
        context: {
          ticketId: input.ticketId,
          message: input.content,
          sender: input.senderId,
          type: input.type
        },
        priority: 'high'
      });

      // Generate AI response if needed
      const aiResponse = await supportAgent.execute({
        task: 'auto_respond',
        context: {
          message: input.content,
          ticketId: input.ticketId
        },
        priority: 'medium'
      });

      return {
        success: true,
        messageId: Date.now().toString(),
        aiResponse: aiResponse.response?.content,
        ...result
      };
    }),
}); 