package fr.n7.entraide.utils;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import fr.n7.entraide.entities.Evenement;
import fr.n7.entraide.entities.Facture;
import fr.n7.entraide.entities.User;

public class MailSender {

    public static void sendWelcomeMail(String mail, String username) {

        Resend resend = new Resend("re_AruLfBBP_Js4HmdhG1xUYH5YERRaXutYR");

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Entraide Étudiante <welcome@entraide.alexandreperrot.fr>")
                .to(mail)
                .subject("Bienvenue sur Entraide Étudiante !")
                .html(welcomeMail(username))
                .build();

        try {
            CreateEmailResponse data = resend.emails().send(params);
            System.out.println(data.getId());
        } catch (ResendException e) {
            e.printStackTrace();
        }

    }

    public static void sendParticipateMail(User user, Evenement evenement) {

        Resend resend = new Resend("re_AruLfBBP_Js4HmdhG1xUYH5YERRaXutYR");

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Entraide Étudiante <event@entraide.alexandreperrot.fr>")
                .to(user.getEmail())
                .subject("Votre participation a été enregistrée")
                .html(eventConfirmationMail(user, evenement))
                .build();

        try {
            CreateEmailResponse data = resend.emails().send(params);
            System.out.println(data.getId());
        } catch (ResendException e) {
            e.printStackTrace();
        }

    }

    public static void sendInvoiceMail(User user, Facture facture) {

        Resend resend = new Resend("re_AruLfBBP_Js4HmdhG1xUYH5YERRaXutYR");

        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Entraide Étudiante <invoice@entraide.alexandreperrot.fr>")
                .to(user.getEmail())
                .subject("Votre facture")
                .html(invoiceMail(user, facture))
                .build();

        try {
            CreateEmailResponse data = resend.emails().send(params);
            System.out.println(data.getId());
        } catch (ResendException e) {
            e.printStackTrace();
        }

    }

    public static String welcomeMail(String username) {
        String html = """
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html dir="ltr" lang="fr">
                  <head>
                    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                    <meta name="x-apple-disable-message-reformatting" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                      body {
                        margin: 0;
                        padding: 0;
                        background-color: #ffffff; /* Ensure background color is set */
                      }
                      table {
                        border-collapse: collapse; /* Better table rendering */
                      }
                      .main-table {
                        max-width: 37.5em; /* 600px */
                        width: 100%%; /* Use full width up to max-width */
                        margin: 0 auto;
                        padding: 20px 10px 48px 10px; /* Add horizontal padding */
                        box-sizing: border-box; /* Include padding in width calculation */
                      }
                      .content-cell {
                         padding: 0 10px; /* Padding inside the cell */
                         box-sizing: border-box;
                      }
                      .logo-text {
                        font-size: 24px;
                        font-weight: bold;
                        color: #333333; /* Choose a suitable color */
                        text-align: center;
                        margin: 20px 0; /* Adjust margin as needed */
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif; /* Match body font */
                      }
                      .button-link {
                        line-height: 100%%;
                        text-decoration: none;
                        display: inline-block; /* Changed from block for better centering control */
                        max-width: 100%%;
                        background-color: #5F51E8; /* Keep original button color or change */
                        border-radius: 3px;
                        color: #fff;
                        font-size: 16px;
                        text-align: center;
                        padding: 12px 25px; /* Adjusted padding */
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                        box-sizing: border-box;
                      }
                      .button-cell {
                        text-align: center; /* Center the button */
                        padding: 10px 0; /* Add padding around the button table */
                      }
                      p {
                        font-size: 16px;
                        line-height: 26px;
                        margin: 16px 0; /* Consistent paragraph margins */
                        color: #333333; /* Default text color */
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                      }
                      .footer-text {
                        font-size: 12px;
                        line-height: 24px;
                        color: #8898aa;
                        margin: 16px 0;
                        text-align: center; /* Center footer text */
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                      }
                      hr {
                        width: 100%%;
                        border: none;
                        border-top: 1px solid #eaeaea;
                        border-color: #cccccc;
                        margin: 20px 0;
                      }
                
                      /* Media query for smaller screens */
                       @media (max-width: 600px) {
                         .main-table {
                            padding: 15px 5px 30px 5px; /* Reduce padding on smaller screens */
                         }
                         .content-cell {
                            padding: 0 5px;
                         }
                         p {
                            font-size: 15px; /* Slightly smaller font */
                            line-height: 24px;
                         }
                         .button-link {
                            padding: 10px 20px; /* Adjust button padding */
                            font-size: 15px;
                         }
                         .logo-text {
                            font-size: 22px;
                         }
                         .footer-text {
                            font-size: 11px;
                            line-height: 20px;
                         }
                       }
                
                    </style>
                    </head>
                  <body style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; margin: 0; padding: 0;'>
                    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
                      Bienvenue sur Entraide Étudiante ! La plateforme d'aide pour les étudiants.
                      <div>
                         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
                      </div>
                    </div>
                    <table
                      align="center"
                      width="100%%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      class="main-table"
                      style="max-width:37.5em; margin:0 auto; padding:20px 10px 48px 10px; background-color:#ffffff;">
                      <tbody>
                        <tr style="width:100%%">
                          <td class="content-cell" style="padding: 0 10px;">
                            <div class="logo-text" style='font-size:24px;font-weight:bold;color:#333333;text-align:center;margin:20px 0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;'>
                              Entraide Étudiante
                            </div>
                
                            <p style='font-size:16px;line-height:26px;margin:16px 0;color:#333333;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;'>
                              Bonjour %s,
                            </p>
                
                            <p style='font-size:16px;line-height:26px;margin:16px 0;color:#333333;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;'>
                              Bienvenue sur Entraide Étudiante ! Nous sommes ravis de vous accueillir sur la plateforme conçue pour faciliter le partage de connaissances, l'entraide et la réussite entre étudiants.
                            </p>
                             <p style='font-size:16px;line-height:26px;margin:16px 0;color:#333333;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;'>
                              Que vous cherchiez de l'aide pour un cours, souhaitiez partager vos notes ou simplement échanger avec d'autres étudiants, vous êtes au bon endroit.
                            </p>
                
                            <table
                              align="center"
                              width="100%%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="text-align:center; margin-top: 20px; margin-bottom: 20px;">
                              <tbody>
                                <tr>
                                  <td class="button-cell" style="text-align: center; padding: 10px 0;">
                                    <a
                                      href="http://localhost:3000/profile" class="button-link"
                                      style='line-height:100%%;text-decoration:none;display:inline-block;max-width:100%%;background-color:#2196F3;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 25px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;'
                                      target="_blank"
                                      >
                                      <span style="max-width:100%%;display:inline-block;line-height:120%%;mso-padding-alt:0px;mso-text-raise:9pt">
                                        Commencer
                                      </span>
                                      </a
                                    >
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                
                            <p style='font-size:16px;line-height:26px;margin:16px 0;color:#333333;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;'>
                              À très bientôt sur la plateforme !<br />L'équipe Entraide Étudiante
                            </p>
                
                            <hr style="width:100%%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                
                            <p class="footer-text" style="font-size:12px;line-height:24px;color:#8898aa;margin:16px 0;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif;">
                              © 2025 Entraide Étudiante. Tous droits réservés.
                              <br />
                              </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </body>
                </html>
                """;
        return String.format(html, username);
    }

    public static String eventConfirmationMail(User user, Evenement evenement) {
        String html = """
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir=\"ltr\" lang=\"fr\">
              <head>
                <meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\" />
                <meta name=\"x-apple-disable-message-reformatting\" />
                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
                <style>
                  /* Styles identiques au mail de bienvenue */
                  body {
                    margin: 0;
                    padding: 0;
                    background-color: #ffffff;
                  }
                  table {
                    border-collapse: collapse;
                  }
                  .main-table {
                    max-width: 37.5em;
                    width: 100%%;
                    margin: 0 auto;
                    padding: 20px 10px 48px 10px;
                    box-sizing: border-box;
                  }
                  .content-cell {
                    padding: 0 10px;
                    box-sizing: border-box;
                  }
                  .logo-text {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333333;
                    text-align: center;
                    margin: 20px 0;
                    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;
                  }
                  p {
                    font-size: 16px;
                    line-height: 26px;
                    margin: 16px 0;
                    color: #333333;
                    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;
                  }
                  .footer-text {
                    font-size: 12px;
                    line-height: 24px;
                    color: #8898aa;
                    margin: 16px 0;
                    text-align: center;
                    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;
                  }
                  hr {
                    width: 100%%;
                    border: none;
                    border-top: 1px solid #eaeaea;
                    border-color: #cccccc;
                    margin: 20px 0;
                  }
                </style>
              </head>
              <body style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif; margin: 0; padding: 0;'>
                <table align=\"center\" width=\"100%%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" class=\"main-table\">
                  <tbody>
                    <tr>
                      <td class=\"content-cell\">
                        <div class=\"logo-text\">Entraide Étudiante</div>

                        <p>Bonjour %s,</p>

                        <p>Nous avons bien enregistré votre participation à l'événement suivant :</p>

                        <p><strong>Nom de l'événement :</strong> %s<br/>
                        <strong>Date :</strong> %s au %s <br/>
                        <strong>Lieu :</strong> %s</p>

                        <p>Merci pour votre inscription ! Nous avons hâte de vous y retrouver.</p>

                        <p>À très bientôt !<br/>L'équipe Entraide Étudiante</p>

                        <hr />

                        <p class=\"footer-text\">© 2025 Entraide Étudiante. Tous droits réservés.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </body>
            </html>
            """;
        return String.format(html, user.getPrenom(), evenement.getNom(), evenement.getDateDebut(), evenement.getDateFin(), evenement.getAdresse());
    }

    public static String invoiceMail(User user, Facture facture) {
        String html = """
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir=\"ltr\" lang=\"fr\">
              <head>
                <meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\" />
                <meta name=\"x-apple-disable-message-reformatting\" />
                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    background-color: #ffffff;
                  }
                  table {
                    border-collapse: collapse;
                  }
                  .main-table {
                    max-width: 37.5em;
                    width: 100%%;
                    margin: 0 auto;
                    padding: 20px 10px 48px 10px;
                    box-sizing: border-box;
                  }
                  .content-cell {
                    padding: 0 10px;
                    box-sizing: border-box;
                  }
                  .logo-text {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333333;
                    text-align: center;
                    margin: 20px 0;
                    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;
                  }
                  p {
                    font-size: 16px;
                    line-height: 26px;
                    margin: 16px 0;
                    color: #333333;
                    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;
                  }
                  .button-link {
                    line-height: 100%%;
                    text-decoration: none;
                    display: inline-block;
                    max-width: 100%%;
                    background-color: #5F51E8;
                    border-radius: 3px;
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                    padding: 12px 25px;
                    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;
                    box-sizing: border-box;
                  }
                  .footer-text {
                    font-size: 12px;
                    line-height: 24px;
                    color: #8898aa;
                    margin: 16px 0;
                    text-align: center;
                    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;
                  }
                  hr {
                    width: 100%%;
                    border: none;
                    border-top: 1px solid #eaeaea;
                    border-color: #cccccc;
                    margin: 20px 0;
                  }
                </style>
              </head>
              <body>
                <table align=\"center\" width=\"100%%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" class=\"main-table\">
                  <tbody>
                    <tr>
                      <td class=\"content-cell\">
                        <div class=\"logo-text\">Entraide Étudiante</div>

                        <p>Bonjour %s,</p>

                        <p>Nous vous remercions pour votre paiement. Vous trouverez ci-dessous les détails de votre facture :</p>

                        <p><strong>Numéro de facture :</strong> %s<br/>
                        <strong>Date :</strong> %s<br/>
                        <strong>Montant :</strong> %s €</p>

                        <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>

                        <p>À très bientôt !<br/>L'équipe Entraide Étudiante</p>

                        <hr />

                        <p class=\"footer-text\">© 2025 Entraide Étudiante. Tous droits réservés.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </body>
            </html>
            """;
        return String.format(html, user.getPrenom(), facture.getIdFacture(), facture.getDateFacture(), facture.getPricePaid());
    }

}
