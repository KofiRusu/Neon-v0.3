import { EmailAgent } from "@neon/core-agents";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const emailRouter = createTRPCRouter({
  sendCampaign: publicProcedure
    .input(z.object({
      name: z.string(),
      subject: z.string(),
      content: z.object({
        html: z.string().optional(),
        text: z.string(),
        template: z.string().optional(),
      }),
      recipients: z.object({
        emails: z.array(z.string()),
        segments: z.array(z.string()).optional(),
        excludeList: z.array(z.string()).optional(),
      }),
      scheduling: z.object({
        sendImmediately: z.boolean().optional(),
        scheduledAt: z.date().optional(),
        timezone: z.string().optional(),
      }),
      settings: z.object({
        trackOpens: z.boolean().optional(),
        trackClicks: z.boolean().optional(),
        replyTo: z.string().optional(),
        fromName: z.string().optional(),
        fromEmail: z.string().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const emailAgent = new EmailAgent('email-marketing', 'Email Marketing Agent');
      return await emailAgent.sendCampaign(input);
    }),

  createSequence: publicProcedure
    .input(z.object({
      name: z.string(),
      trigger: z.enum(['signup', 'purchase', 'abandon_cart', 'manual']),
      emails: z.array(z.object({
        subject: z.string(),
        content: z.object({
          html: z.string().optional(),
          text: z.string(),
          template: z.string().optional(),
        }),
        delayDays: z.number(),
        conditions: z.record(z.any()).optional(),
      })),
      settings: z.object({
        trackOpens: z.boolean().optional(),
        trackClicks: z.boolean().optional(),
        replyTo: z.string().optional(),
        fromName: z.string().optional(),
        fromEmail: z.string().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const emailAgent = new EmailAgent('email-marketing', 'Email Marketing Agent');
      return await emailAgent.createSequence(input);
    }),

  getAnalytics: publicProcedure
    .input(z.object({
      campaignId: z.string(),
      timeRange: z.enum(['7d', '30d', '90d', '1y']).optional(),
    }))
    .query(async ({ input }) => {
      if (input.campaignId === 'all') {
        // Return overall analytics
        return {
          totalCampaigns: 24,
          totalSent: 45620,
          avgOpenRate: 28.5,
          avgClickRate: 4.2,
          totalDelivered: 44890,
          totalBounced: 730,
          totalUnsubscribed: 156,
          revenueGenerated: 12450.00,
          conversionRate: 2.1,
          campaignStats: [
            {
              campaignId: '1',
              name: 'Welcome Series',
              sent: 1250,
              delivered: 1235,
              opened: 401,
              clicked: 73,
              openRate: 32.1,
              clickRate: 5.8,
              conversionRate: 8.2,
              revenue: 2100.00
            },
            {
              campaignId: '2',
              name: 'Product Newsletter',
              sent: 5420,
              delivered: 5398,
              opened: 1583,
              clicked: 215,
              openRate: 29.3,
              clickRate: 4.0,
              conversionRate: 1.8,
              revenue: 4320.00
            }
          ]
        };
      } else {
        // Return specific campaign analytics
        const emailAgent = new EmailAgent('email-marketing', 'Email Marketing Agent');
        return await emailAgent.getAnalytics(input.campaignId);
      }
    }),

  getCampaigns: publicProcedure
    .input(z.object({
      status: z.enum(['all', 'draft', 'scheduled', 'sending', 'sent', 'paused']).optional(),
      limit: z.number().min(1).max(100).optional(),
      offset: z.number().min(0).optional(),
    }))
    .query(async ({ input }) => {
      // Return campaigns list
      return {
        campaigns: [
          {
            id: '1',
            name: 'Welcome Series - New Users',
            subject: 'Welcome to NeonHub! 🚀',
            status: 'sent',
            createdAt: new Date('2024-01-10T09:00:00Z'),
            sentAt: new Date('2024-01-15T10:00:00Z'),
            recipients: 1250,
            delivered: 1235,
            opened: 401,
            clicked: 73,
            openRate: 32.1,
            clickRate: 5.8,
            type: 'welcome',
            template: 'welcome_new_user'
          },
          {
            id: '2',
            name: 'Product Update Newsletter',
            subject: 'New AI Features Available Now',
            status: 'scheduled',
            createdAt: new Date('2024-01-18T15:30:00Z'),
            scheduledAt: new Date('2024-01-20T09:00:00Z'),
            recipients: 5420,
            openRate: 0,
            clickRate: 0,
            type: 'newsletter',
            template: 'newsletter'
          },
          {
            id: '3',
            name: 'Abandoned Cart Recovery',
            subject: 'Complete your purchase - 20% off',
            status: 'sending',
            createdAt: new Date('2024-01-16T12:00:00Z'),
            sentAt: new Date('2024-01-16T14:30:00Z'),
            recipients: 890,
            delivered: 875,
            opened: 215,
            clicked: 73,
            openRate: 24.6,
            clickRate: 8.2,
            type: 'promotional',
            template: 'abandoned_cart'
          }
        ],
        pagination: {
          total: 3,
          limit: input.limit || 10,
          offset: input.offset || 0,
          hasMore: false
        }
      };
    }),

  manageList: publicProcedure
    .input(z.object({
      action: z.enum(['create_list', 'add_subscribers', 'remove_subscribers', 'clean_list']),
      listId: z.string().optional(),
      listName: z.string().optional(),
      emails: z.array(z.string()).optional(),
      totalCount: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const emailAgent = new EmailAgent('email-marketing', 'Email Marketing Agent');
      return await emailAgent.execute({
        task: 'manage_lists',
        context: input,
        priority: 'medium'
      });
    }),

  runABTest: publicProcedure
    .input(z.object({
      variants: z.array(z.object({
        name: z.string(),
        subject: z.string(),
        content: z.any(),
      })),
      splitRatio: z.array(z.number()),
      testDuration: z.number(),
    }))
    .mutation(async ({ input }) => {
      const emailAgent = new EmailAgent('email-marketing', 'Email Marketing Agent');
      return await emailAgent.execute({
        task: 'a_b_testing',
        context: input,
        priority: 'medium'
      });
    }),

  getEmailTemplates: publicProcedure
    .query(async () => {
      // Return predefined email templates
      return {
        data: [
          {
            id: 'welcome',
            name: 'Welcome Email',
            subject: 'Welcome to {{company_name}}!',
            content: {
              html: '<h1>Welcome {{first_name}}!</h1><p>Thank you for joining us.</p>',
              text: 'Welcome {{first_name}}! Thank you for joining us.',
            },
            variables: ['company_name', 'first_name'],
          },
          {
            id: 'newsletter',
            name: 'Newsletter Template',
            subject: '{{company_name}} Weekly Newsletter',
            content: {
              html: '<h1>This Week at {{company_name}}</h1><div>{{newsletter_content}}</div>',
              text: 'This Week at {{company_name}}\n\n{{newsletter_content}}',
            },
            variables: ['company_name', 'newsletter_content'],
          },
          {
            id: 'abandoned_cart',
            name: 'Abandoned Cart Recovery',
            subject: 'You left something in your cart',
            content: {
              html: '<h2>Don\'t miss out!</h2><p>Complete your purchase for {{product_name}}</p>',
              text: 'Don\'t miss out! Complete your purchase for {{product_name}}',
            },
            variables: ['product_name'],
          },
        ],
      };
    }),
}); 