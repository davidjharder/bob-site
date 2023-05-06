import type { NextPage } from "next";
import { CustomMetaProps } from "../components/CustomMeta";

// Material UI Bits
import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// Our components
import { ColorBanner } from "../components/ColorBanner";
import { HeroBanner } from "../components/home/HeroBanner";
import { AutoCenteredOnSmall } from "../components/ImageBanner";
import { PersonalizeBanner } from "../components/home/PersonalizeBanner";
import PageBase from "../components/PageBase";

import BudgieMenuImage from "../public/images/BudgieMenu.png";
import RavenImage from "../public/images/Raven-WidgetView.jpg";

import { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { Uris } from "../constants";
import { useState } from "react";
import { SiteTheme } from "@buddiesofbudgie/ui";
import { LightboxImage } from "../components/LightboxImage";

type HomepageImageBannerContent = {
  AltImageText: string;
  Headline: string;
  Image: StaticImageData;
  Subtext: string;
  TabText: string;
};

export const meta: CustomMetaProps = {
  title: "Home",
};

const Home: NextPage = () => {
  const [featureTab, setFeatureTab] = useState(0);
  const t = useTranslations();

  const theme = useTheme();
  const colorBannersStackDirection = useMediaQuery(theme.breakpoints.up("md")) ? "row" : "column";
  const colorBannersComponentMaxWidth = useMediaQuery(theme.breakpoints.up("md")) ? "46%" : "100%";

  const imageBannerContent: HomepageImageBannerContent[] = [
    {
      AltImageText: "Budgie Menu Image",
      Headline: t("Home.Tabs.MenuHeader"),
      Image: BudgieMenuImage,
      Subtext: t("Home.Tabs.MenuText"),
      TabText: t("Home.Tabs.MenuTabText"),
    },
    {
      AltImageText: "Raven",
      Headline: t("Home.Tabs.RavenHeader"),
      Image: RavenImage,
      Subtext: t("Home.Tabs.RavenText"),
      TabText: t("Home.Tabs.RavenTabText"),
    },
  ];

  return (
    <PageBase meta={meta}>
      <Container maxWidth="fullhd">
        <HeroBanner />
        <Stack alignItems="center" maxWidth="fullhd">
          <Tabs
            TabIndicatorProps={{
              style: {
                background: SiteTheme.palette.success.main,
              },
            }}
            centered
            onChange={(_, value: number) => setFeatureTab(value)}
            value={featureTab}
          >
            {imageBannerContent.map((data) => (
              <Tab
                key={`HomeTabs-Tab-${data.TabText}`}
                label={data.TabText}
                sx={{
                  ["&.Mui-selected"]: {
                    color: SiteTheme.palette.success.main,
                  },
                }}
              />
            ))}
          </Tabs>
          {imageBannerContent.map((data, idx) => {
            const { AltImageText, Headline, Image, Subtext } = data;

            return (
              <Box key={`HomeTabs-TabPanel-${data.TabText}`} role="tabpanel" hidden={featureTab !== idx}>
                <Stack alignItems="center" rowGap={2} marginY={2}>
                  <LightboxImage
                    altImageText={AltImageText}
                    key={`imagebanner-${AltImageText}`}
                    height={Image.height}
                    image={Image}
                    previewHeight={506}
                    previewWidth={900}
                    width={Image.width}
                  />
                  <Stack
                    alignItems={AutoCenteredOnSmall}
                    spacing={2}
                    paddingTop={2}
                    paddingX={2}
                    sx={{
                      [theme.breakpoints.down("md")]: {
                        textAlign: "center",
                      },
                      [theme.breakpoints.up("md")]: {
                        marginInlineStart: "2vh",
                      },
                      [theme.breakpoints.between("md", "lg")]: {
                        maxWidth: "calc(90% - 400px)",
                      },
                      [theme.breakpoints.up("lg")]: {
                        maxWidth: "calc(80% - 400px)",
                      },
                    }}
                  >
                    <Typography color={theme.palette.success.main} variant="h5">
                      {Headline}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "normal",
                        lineHeight: 1.5,
                        whiteSpace: "pre-line",
                      }}
                      variant="h6"
                    >
                      {Subtext}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Container>
      <PersonalizeBanner />
      <Container maxWidth="fullhd">
        <Stack
          direction={colorBannersStackDirection}
          justifyContent="space-between"
          sx={{
            "& .ColorBanner": {
              maxWidth: colorBannersComponentMaxWidth,
              marginBottom: "2vh",
            },
          }}
        >
          <ColorBanner
            backgroundColor="linear-gradient(to right, #9f7beb, #7b83eb)"
            body={t("Home.ColorBanner.Built.Text")}
            buttonHref="/about"
            buttonText={t("Home.ColorBanner.Built.Button")}
            buttonTextColor="#9E7BEB"
            header={t("Home.ColorBanner.Built.Header")}
          />
          <ColorBanner
            backgroundColor="linear-gradient(to right, #1687C7, #4DB2EC)"
            body={t("Home.ColorBanner.Get.Text")}
            buttonHref={Uris.GET_BUDGIE}
            buttonText={t("Get Budgie")}
            buttonTextColor="#1687C7"
            header={t("Home.ColorBanner.Get.Header")}
          />
        </Stack>
      </Container>
    </PageBase>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    messages: (await import(`../messages/${locale}.json`)).default,
  },
});

export default Home;
