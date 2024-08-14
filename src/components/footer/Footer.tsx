import { Divider, Stack, styled, Typography } from '@mui/material';
import instagramLogo from '../../assets/instagram.png';
import facebookLogo from '../../assets/facebook.png';

const Footer = () => {
  return (
    <FooterWrapper>
      <ContentGroup gap={4} direction="row">
        <ContentGroup gap={0.5} direction="row">
          <Link href="https://www.instagram.com/">
            <ImageLogo src={instagramLogo} />
          </Link>
          <Link href="https://www.facebook.com/">
            <ImageLogo src={facebookLogo} />
          </Link>
        </ContentGroup>

        <ContentGroup
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          gap={1}
        >
          <Body3TextSecondary>contact@leftovers.com</Body3TextSecondary>

          <Link href="#">
            <Body3TextPrimary>Terms of Services</Body3TextPrimary>
          </Link>
          <Link href="#">
            <Body3TextPrimary>Privacy Policy</Body3TextPrimary>
          </Link>
        </ContentGroup>
      </ContentGroup>

      <Body3TextSecondary>
        powered by <BotAI>BotAI</BotAI>
      </Body3TextSecondary>
    </FooterWrapper>
  );
};

const FooterWrapper = styled('footer')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 4.5rem',
});

const ImageLogo = styled('img')({
  height: '1.5rem',
});

const ContentGroup = styled(Stack)({
  alignItems: 'center',
});

const Body3TextSecondary = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  color: theme.palette.text.secondary,
  fontSize: '12px',
}));

const Body3TextPrimary = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  color: theme.palette.text.primary,
  fontSize: '12px',
}));

const Link = styled('a')({
  textDecoration: 'none',
});

const BotAI = styled('span')({
  textDecoration: 'underline',
});

export default Footer;
