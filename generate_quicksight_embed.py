import boto3
import sys

def main():
    try:
        client = boto3.client('quicksight', region_name='us-east-1')

        response = client.generate_embed_url_for_anonymous_user(
            AwsAccountId='917003953046',
            Namespace='default',  # Change if your namespace is different
            AuthorizedResourceArns=[
                'arn:aws:quicksight:us-east-1:917003953046:dashboard/24000dab-50bb-471b-8375-3c56de3506af'
            ],
            AllowedDomains=[
                'https://main.d1pqk1heqmxys7.amplifyapp.com',
                'http://localhost:5173',
                'http://localhost:3000'  # add more if needed
            ],
            ExperienceConfiguration={
                'Dashboard': {
                    'InitialDashboardId': '24000dab-50bb-471b-8375-3c56de3506af'
                }
            },
            SessionLifetimeInMinutes=600  # 10 hours
        )

        print("Anonymous Embed URL:")
        print(response['EmbedUrl'])
        print("\nStatus:", response['Status'])

    except Exception as e:
        print("Error:", str(e))
        print("\nPossible causes:")
        print("- Missing AWS credentials (run 'aws configure')")
        print("- Insufficient IAM permissions")
        print("- Wrong region/namespace/dashboard ID")
        print("- QuickSight not in Enterprise edition")
        print("- Session capacity pricing not enabled")

if __name__ == "__main__":
    main()