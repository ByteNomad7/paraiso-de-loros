/**
 * Phase 3 – French City SEO Expansion
 * Generates all 50 /fr/perroquets-a-vendre-[slug]/ pages
 * Upgrades existing 13 + creates 37 new ones
 * Then updates sitemap_fr.xml and reports.
 */
const fs = require('fs');
const path = require('path');

// ─── CITY DATA ───────────────────────────────────────────────────────────────
// Fields: slug, name, nameGentile, region, dept, pop, distKm, driveH,
//         nearby (nearest big French city if small), angle, cityCTA,
//         localDetail (1-2 unique sentences for intro), transport (shipping note)
const CITIES = [
  // ── Already existing (13) — will be fully rebuilt to new standard ──────────
  {
    slug:'paris', name:'Paris', nameGentile:'Parisiens', region:'Île-de-France', dept:'75',
    pop:'2,1 millions', distKm:1100, driveH:10,
    angle:'capitale cosmopolite et premier marché français des oiseaux exotiques',
    localDetail:`Paris concentre la plus grande densité d'amateurs de perroquets en France, avec des clubs aviaires actifs dans chaque arrondissement et une culture des NAC (Nouveaux Animaux de Compagnie) parmi les plus développées d'Europe. La ville dispose de nombreux vétérinaires spécialisés en oiseaux exotiques, notamment dans le 12e et le 15e arrondissement.`,
    transport:`Nous livrons régulièrement à Paris et en Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Le transport est organisé par transporteur agréé, avec suivi en temps réel et remise en main propre. Délai habituel : 2 à 3 jours ouvrés après confirmation de commande.`,
    cityCTA:'Adopter un perroquet à Paris',
    faqExtra:[
      {q:'Livrez-vous dans toute l\'Île-de-France ?', a:'Oui, nous livrons dans les 8 départements d\'Île-de-France (75, 77, 78, 91, 92, 93, 94, 95). Les modalités précises sont définies lors de votre demande par email.'},
      {q:'Y a-t-il des vétérinaires spécialisés en oiseaux à Paris ?', a:'Absolument. Paris dispose de plusieurs cliniques vétérinaires spécialisées en NAC et en oiseaux exotiques, notamment dans les 12e, 15e et 16e arrondissements.'},
    ]
  },
  {
    slug:'marseille', name:'Marseille', nameGentile:'Marseillais', region:'Provence-Alpes-Côte d\'Azur', dept:'13',
    pop:'870 000', distKm:460, driveH:5,
    angle:'deuxième ville de France et porte d\'entrée méditerranéenne',
    localDetail:`Marseille, ville méditerranéenne ouverte sur le monde, affiche une culture des animaux exotiques héritée de son histoire portuaire et multiculturelle. La proximité géographique avec notre élevage espagnol (moins de 5h de route) réduit considérablement le temps de transport pour vos oiseaux, ce qui est un avantage majeur pour leur bien-être.`,
    transport:`Marseille est l'une des destinations les plus accessibles depuis notre élevage de Llíria : 460 km, soit environ 5 heures de route. Nous livrons régulièrement dans les Bouches-du-Rhône (13) et sur l'ensemble de la région PACA. La proximité garantit un transport court et confortable pour l'oiseau.`,
    cityCTA:'Adopter un perroquet à Marseille',
    faqExtra:[
      {q:'Marseille est-elle proche de votre élevage ?', a:'Oui, Marseille est l\'une des villes françaises les plus proches de notre élevage de Llíria (Espagne) : environ 460 km, soit ~5h de route. Cela réduit significativement la durée du voyage pour votre oiseau.'},
      {q:'Livrez-vous dans les Bouches-du-Rhône et en PACA ?', a:'Oui, nous livrons dans tout le département 13 et dans toute la région Provence-Alpes-Côte d\'Azur. Contactez-nous pour les modalités exactes.'},
    ]
  },
  {
    slug:'lyon', name:'Lyon', nameGentile:'Lyonnais', region:'Auvergne-Rhône-Alpes', dept:'69',
    pop:'515 000', distKm:520, driveH:'5,5',
    angle:'capitale des Gaules et troisième métropole française',
    localDetail:`Lyon, ville de culture et de gastronomie, abrite une communauté d'amateurs d'oiseaux exotiques très active, avec plusieurs associations ornithologiques reconnues en région Auvergne-Rhône-Alpes. Le tissu vétérinaire lyonnais est l'un des plus denses de France pour les oiseaux exotiques, avec des praticiens spécialisés dans les arrondissements 3, 6 et 7.`,
    transport:`Lyon et la métropole du Grand Lyon (Ain et Rhône inclus) sont desservis régulièrement par nos transporteurs partenaires agréés. Depuis Llíria, le trajet représente environ 520 km (5h30). La livraison est organisée avec soin pour minimiser le stress de l'oiseau.`,
    cityCTA:'Adopter un perroquet à Lyon',
    faqExtra:[
      {q:'Livrez-vous dans toute la métropole de Lyon ?', a:'Oui, nous couvrons l\'ensemble de la métropole lyonnaise et les départements environnants (Ain, Isère). Les délais et modalités précises sont communiqués par email.'},
      {q:'Y a-t-il des clubs d\'oiseaux exotiques à Lyon ?', a:'Oui, la région lyonnaise compte plusieurs associations ornithologiques et clubs de passionnés d\'oiseaux exotiques très actifs. Nous pouvons vous orienter vers des réseaux locaux si vous souhaitez échanger avec d\'autres propriétaires.'},
    ]
  },
  {
    slug:'toulouse', name:'Toulouse', nameGentile:'Toulousains', region:'Occitanie', dept:'31',
    pop:'486 000', distKm:380, driveH:'3,5',
    angle:'Ville Rose et capitale de l\'aéronautique européenne',
    localDetail:`Toulouse, cité dynamique du Sud-Ouest, est l'une des villes françaises les plus proches de notre élevage de Llíria. À seulement 380 km et moins de 4 heures de route, Toulouse bénéficie de l'un des délais de livraison les plus courts de France, ce qui se traduit par un transport minimal pour vos oiseaux. La Haute-Garonne compte une communauté de passionnés d'exotiques en plein essor.`,
    transport:`Toulouse est idéalement située pour la livraison depuis l'Espagne. La distance est parmi les plus courtes des grandes villes françaises (380 km, ~3h30). Nous livrons régulièrement en Haute-Garonne (31) et dans toute l'Occitanie.`,
    cityCTA:'Adopter un perroquet à Toulouse',
    faqExtra:[
      {q:'Toulouse est-elle loin de votre élevage ?', a:'Non, Toulouse est l\'une des villes françaises les plus proches de notre élevage de Llíria : environ 380 km, soit moins de 4 heures de route. C\'est un avantage majeur pour un transport doux de votre futur oiseau.'},
      {q:'Livrez-vous en Haute-Garonne et en Occitanie ?', a:'Oui, nous desservons régulièrement tout le département 31 et l\'ensemble de la région Occitanie (Hérault, Gard, Aude, Tarn, etc.).'},
    ]
  },
  {
    slug:'nice', name:'Nice', nameGentile:'Niçois', region:'Provence-Alpes-Côte d\'Azur', dept:'06',
    pop:'342 000', distKm:570, driveH:'5,5',
    angle:'capitale de la Côte d\'Azur et ville cosmopolite au bord de la Méditerranée',
    localDetail:`Nice, ville de lumière et de douceur méditerranéenne, est un marché porteur pour les oiseaux exotiques. Sa population internationale et son niveau de vie élevé en font l'une des villes françaises les plus actives pour l'acquisition de perroquets haut de gamme. Le département des Alpes-Maritimes dispose d'une offre vétérinaire aviaire de qualité.`,
    transport:`Nice et les Alpes-Maritimes (06) sont accessibles depuis Llíria via l'autoroute A8 (environ 570 km, 5h30). Nous livrons sur toute la Côte d'Azur, du Var aux Alpes-Maritimes, avec un transporteur spécialisé en animaux vivants.`,
    cityCTA:'Adopter un perroquet à Nice',
    faqExtra:[
      {q:'Livrez-vous sur toute la Côte d\'Azur ?', a:'Oui, nous couvrons Nice, Cannes, Antibes, Monaco et l\'ensemble des Alpes-Maritimes ainsi que le Var. Contactez-nous pour les modalités selon votre commune.'},
      {q:'Y a-t-il une réglementation spécifique pour les oiseaux exotiques à Nice ?', a:'La réglementation française (CITES) s\'applique sur tout le territoire, Nice inclus. Nous fournissons systématiquement tous les documents officiels requis.'},
    ]
  },
  {
    slug:'nantes', name:'Nantes', nameGentile:'Nantais', region:'Pays de la Loire', dept:'44',
    pop:'314 000', distKm:1000, driveH:9,
    angle:'capitale des Pays de la Loire et ville d\'art à l\'estuaire de la Loire',
    localDetail:`Nantes, métropole dynamique et créative du Grand Ouest, connaît une montée en puissance des amateurs d'animaux exotiques portée par sa population jeune et urbaine. La ville dispose de vétérinaires spécialisés en oiseaux exotiques et d'un tissu associatif aviaire actif dans le département 44.`,
    transport:`Nantes est desservie depuis Llíria (environ 1 000 km) par nos transporteurs partenaires spécialisés en transport d'animaux vivants. Le trajet est organisé en itinéraire optimisé pour minimiser la durée de voyage et le stress de l'oiseau.`,
    cityCTA:'Adopter un perroquet à Nantes',
    faqExtra:[
      {q:'Livrez-vous en Pays de la Loire depuis l\'Espagne ?', a:'Oui, nous livrons régulièrement dans les Pays de la Loire (44, 49, 72, 53, 85). Malgré la distance (environ 1 000 km), le transport est organisé professionnellement pour assurer le confort de l\'oiseau.'},
      {q:'Combien de temps prend la livraison à Nantes ?', a:'Le délai habituel est de 2 à 4 jours ouvrés après confirmation de commande et paiement, selon le transporteur disponible et le jour de départ.'},
    ]
  },
  {
    slug:'strasbourg', name:'Strasbourg', nameGentile:'Strasbourgeois', region:'Grand Est', dept:'67',
    pop:'285 000', distKm:1000, driveH:9,
    angle:'capitale de l\'Alsace et siège du Parlement Européen',
    localDetail:`Strasbourg, à la croisée des cultures française et allemande, compte une tradition ornithologique forte héritée de la culture alsacienne. La ville est un carrefour européen qui facilite les échanges pour les amateurs d'oiseaux exotiques. La région Grand Est dispose d'une réglementation CITES bien connue de ses vétérinaires spécialisés.`,
    transport:`Strasbourg et l'Alsace (67-68) sont reliés à notre élevage via l'autoroute (environ 1 000 km). Nous livrons dans le Bas-Rhin, le Haut-Rhin et toute la région Grand Est avec nos transporteurs partenaires certifiés transport d'animaux.`,
    cityCTA:'Adopter un perroquet à Strasbourg',
    faqExtra:[
      {q:'Peut-on acheter un perroquet depuis Strasbourg auprès d\'un éleveur espagnol ?', a:'Absolument. La réglementation CITES s\'applique à l\'ensemble de l\'Union Européenne. Notre élevage espagnol peut livrer à Strasbourg avec tous les documents légaux en règle, sans aucune formalité douanière puisque l\'Espagne et la France font partie de l\'UE.'},
      {q:'Livrez-vous en Allemagne si je suis frontalier de Strasbourg ?', a:'Nous livrons principalement en France. Pour une livraison en Allemagne, contactez-nous — nous étudions les demandes au cas par cas.'},
    ]
  },
  {
    slug:'montpellier', name:'Montpellier', nameGentile:'Montpelliérains', region:'Occitanie', dept:'34',
    pop:'285 000', distKm:380, driveH:'3,5',
    angle:'ville universitaire et solaire du Languedoc méditerranéen',
    localDetail:`Montpellier, l'une des villes les plus jeunes de France par sa population, combine une culture méditerranéenne ouverte et une vraie communauté de passionnés de perroquets. Sa proximité avec notre élevage (380 km, à peine 3h30 de route) en fait l'une des destinations les plus rapides à livrer depuis Llíria — un avantage décisif pour le bien-être de l'oiseau pendant le transport.`,
    transport:`Montpellier est l'une des villes françaises les plus proches de notre élevage de Llíria. À 380 km, le transport est court (moins de 4h), ce qui minimise le stress pour l'oiseau. Nous livrons dans tout l'Hérault (34) et en Occitanie.`,
    cityCTA:'Adopter un perroquet à Montpellier',
    faqExtra:[
      {q:'Montpellier est-elle proche de votre élevage ?', a:'Oui, Montpellier est l\'une des grandes villes françaises les plus proches de Llíria : environ 380 km, soit ~3h30 de route. Le transport est donc court et très confortable pour l\'oiseau.'},
      {q:'Livrez-vous dans l\'Hérault et le Gard ?', a:'Oui, nous desservons régulièrement l\'Hérault (34), le Gard (30), l\'Aude (11) et l\'ensemble de la région Occitanie côtière.'},
    ]
  },
  {
    slug:'bordeaux', name:'Bordeaux', nameGentile:'Bordelais', region:'Nouvelle-Aquitaine', dept:'33',
    pop:'254 000', distKm:730, driveH:7,
    angle:'capitale mondiale du vin et métropole atlantique en plein essor',
    localDetail:`Bordeaux, ville récompensée par l'UNESCO pour son patrimoine, attire une population aisée et internationale très réceptive aux animaux de compagnie rares. La Gironde dispose d'un tissu vétérinaire de qualité pour les oiseaux exotiques, et la communauté locale de passionnés de perroquets est organisée et active.`,
    transport:`Bordeaux et la Gironde (33) sont accessibles depuis Llíria en environ 730 km (7h de route). Nous livrons dans toute la Nouvelle-Aquitaine via nos transporteurs partenaires spécialisés en animaux vivants.`,
    cityCTA:'Adopter un perroquet à Bordeaux',
    faqExtra:[
      {q:'Livrez-vous en Gironde et en Nouvelle-Aquitaine ?', a:'Oui, nous livrons dans tout le département de la Gironde (33) et dans l\'ensemble de la Nouvelle-Aquitaine (Pyrénées-Atlantiques, Landes, Lot-et-Garonne, etc.).'},
      {q:'Existe-t-il des clubs de perroquets à Bordeaux ?', a:'La région bordelaise compte des passionnés organisés en groupes et associations informelles. Notre équipe peut vous mettre en contact avec des propriétaires locaux si vous le souhaitez.'},
    ]
  },
  {
    slug:'lille', name:'Lille', nameGentile:'Lillois', region:'Hauts-de-France', dept:'59',
    pop:'234 000', distKm:1200, driveH:11,
    angle:'capitale des Flandres et métropole transfrontalière franco-belge',
    localDetail:`Lille, métropole dynamique aux portes de la Belgique et du Royaume-Uni (via l'Eurostar), est un centre urbain dense avec une forte culture des animaux exotiques. Malgré la distance avec notre élevage espagnol, la demande lilloise est constante et soutenue, preuve que la qualité prime sur la proximité géographique.`,
    transport:`Lille est la ville française la plus éloignée de notre élevage (environ 1 200 km, 11h). Le transport est néanmoins organisé avec le plus grand soin par nos partenaires certifiés, avec un itinéraire optimisé et des pauses de repos pour les oiseaux sur les trajets de plus de 8 heures.`,
    cityCTA:'Adopter un perroquet à Lille',
    faqExtra:[
      {q:'Peut-on livrer des oiseaux vivants aussi loin que Lille ?', a:'Absolument. Nous livrons régulièrement dans les Hauts-de-France, y compris à Lille. Le transport d\'oiseaux sur de longues distances est encadré par des règles de bien-être animal strictes que nous respectons scrupuleusement.'},
      {q:'Livrez-vous en Belgique depuis Lille ?', a:'Notre zone de livraison couvre principalement la France. Pour une livraison en Belgique, contactez-nous directement — nous étudions chaque demande.'},
    ]
  },
  {
    slug:'rennes', name:'Rennes', nameGentile:'Rennais', region:'Bretagne', dept:'35',
    pop:'221 000', distKm:1100, driveH:10,
    angle:'capitale de la Bretagne et ville étudiante dynamique',
    localDetail:`Rennes, cœur battant de la Bretagne, conjugue un dynamisme étudiant remarquable et une culture régionale forte. Les Bretons sont connus pour leur attachement aux animaux de compagnie, et la communauté des propriétaires de perroquets y est active et bien informée sur les réglementations CITES.`,
    transport:`Rennes et l'Ille-et-Vilaine (35) sont desservis depuis Llíria (environ 1 100 km, 10h). Nous livrons dans toute la Bretagne (22, 29, 35, 56) grâce à notre réseau de transporteurs partenaires spécialisés.`,
    cityCTA:'Adopter un perroquet à Rennes',
    faqExtra:[
      {q:'Livrez-vous dans toute la Bretagne ?', a:'Oui, nous couvrons les quatre départements bretons : Ille-et-Vilaine (35), Côtes-d\'Armor (22), Finistère (29) et Morbihan (56).'},
      {q:'Comment se passe le transport sur une si longue distance ?', a:'Le transport est organisé avec des transporteurs certifiés pour les animaux vivants. Des pauses et des vérifications régulières garantissent le confort et la sécurité de l\'oiseau tout au long du trajet.'},
    ]
  },
  {
    slug:'grenoble', name:'Grenoble', nameGentile:'Grenoblois', region:'Auvergne-Rhône-Alpes', dept:'38',
    pop:'157 000', distKm:600, driveH:6,
    angle:'capitale des Alpes et ville de l\'innovation technologique',
    localDetail:`Grenoble, nichée au cœur des Alpes entre le Vercors, la Chartreuse et Belledonne, est une ville d'ingénieurs et de chercheurs avec une forte culture scientifique et une sensibilité marquée au bien-être animal. La communauté des passionnés de perroquets y est informée et exigeante en matière de documentation et de traçabilité des oiseaux.`,
    transport:`Grenoble et l'Isère (38) sont accessibles depuis Llíria en environ 600 km (6h). Nous livrons dans l'agglomération grenobloise et dans l'ensemble de l'Isère via nos partenaires logistiques spécialisés.`,
    cityCTA:'Adopter un perroquet à Grenoble',
    faqExtra:[
      {q:'Livrez-vous en Isère et dans les Alpes depuis l\'Espagne ?', a:'Oui, nous livrons régulièrement à Grenoble et dans tout le département de l\'Isère (38). Le relief alpin n\'est pas un obstacle pour nos transporteurs partenaires.'},
      {q:'Le climat alpin est-il adapté aux perroquets tropicaux ?', a:'En intérieur, oui. Les perroquets vivent en intérieur chauffé et ne sont pas exposés aux conditions climatiques alpines. Le climat de Grenoble (froid en hiver) ne pose aucun problème si l\'oiseau est correctement hébergé à domicile.'},
    ]
  },
  {
    slug:'dijon', name:'Dijon', nameGentile:'Dijonnais', region:'Bourgogne-Franche-Comté', dept:'21',
    pop:'156 000', distKm:760, driveH:7,
    angle:'capitale de la Bourgogne et ville de la moutarde et des vins fins',
    localDetail:`Dijon, capitale bourguignonne au riche patrimoine gastronomique et architectural, compte une communauté d'amateurs d'oiseaux exotiques soudée autour d'associations régionales actives. La ville dispose d'excellents vétérinaires spécialisés dans les oiseaux exotiques et les NAC dans le département 21.`,
    transport:`Dijon et la Côte-d'Or (21) sont reliés à notre élevage en environ 760 km (7h de route). Nous livrons dans toute la Bourgogne-Franche-Comté avec nos transporteurs partenaires agréés.`,
    cityCTA:'Adopter un perroquet à Dijon',
    faqExtra:[
      {q:'Livrez-vous en Bourgogne et en Franche-Comté ?', a:'Oui, nous desservons la Côte-d\'Or (21), la Saône-et-Loire (71), l\'Yonne (89), la Nièvre (58) et toute la région Bourgogne-Franche-Comté.'},
      {q:'Combien de temps dure le transport jusqu\'à Dijon ?', a:'Depuis notre élevage de Llíria, le trajet jusqu\'à Dijon représente environ 760 km et 7 heures de route. La livraison est effectuée en 2 à 3 jours ouvrés après confirmation.'},
    ]
  },
  // ── New 37 cities ─────────────────────────────────────────────────────────
  {
    slug:'reims', name:'Reims', nameGentile:'Rémois', region:'Grand Est', dept:'51',
    pop:'184 000', distKm:1050, driveH:10,
    angle:'ville du sacre des rois de France et capitale du champagne',
    localDetail:`Reims, dont la cathédrale gothique est l'une des plus admirées du monde, est aussi un centre économique majeur de la Champagne-Ardenne. La ville attire une clientèle aisée, attachée à la qualité et à l'authenticité, qualités qui correspondent parfaitement à notre approche de l'élevage responsable et documenté. La tradition champenoise du soin apporté aux détails se retrouve dans l'exigence de nos clients rémois.`,
    transport:`Reims et la Marne (51) sont accessibles depuis Llíria en environ 1 050 km (10h de route). Nous livrons dans toute la Marne et le Grand Est via nos transporteurs partenaires spécialisés en transport d'animaux vivants.`,
    cityCTA:'Adopter un perroquet à Reims',
    faqExtra:[
      {q:'Livrez-vous dans la Marne et le Grand Est ?', a:'Oui, nous desservons Reims, Châlons-en-Champagne et tout le département de la Marne (51) ainsi que le reste du Grand Est.'},
      {q:'Combien de temps dure la livraison à Reims ?', a:'Le délai habituel est de 2 à 3 jours ouvrés depuis notre élevage de Llíria. Le transport est organisé avec soin pour minimiser la durée de voyage de l\'oiseau.'},
    ]
  },
  {
    slug:'le-havre', name:'Le Havre', nameGentile:'Havrais', region:'Normandie', dept:'76',
    pop:'170 000', distKm:1200, driveH:11,
    angle:'premier port de France et ville ouvrière réinventée par Auguste Perret',
    localDetail:`Le Havre, classée au patrimoine mondial de l'UNESCO pour son architecture de béton armé d'après-guerre, est une ville portuaire avec une longue tradition d'ouverture sur le monde. Sa culture maritime et son histoire internationale ont façonné une population curieuse et ouverte aux animaux exotiques. La proximité de Rouen et de Caen facilite les échanges entre passionnés de la région normande.`,
    transport:`Le Havre et la Seine-Maritime (76) sont accessibles depuis Llíria en environ 1 200 km (11h). Nous livrons dans toute la Normandie (76, 27, 14, 50, 61) grâce à notre réseau de transporteurs agréés.`,
    cityCTA:'Adopter un perroquet au Havre',
    faqExtra:[
      {q:'Livrez-vous en Normandie depuis l\'Espagne ?', a:'Oui, nous desservons l\'ensemble de la Normandie, incluant Le Havre, Rouen, Caen, Cherbourg et les cinq départements normands.'},
      {q:'Le transport par ferry depuis l\'Espagne est-il possible ?', a:'Non, nous n\'utilisons pas de ferry. Le transport se fait exclusivement par route terrestre avec des transporteurs certifiés pour les animaux vivants.'},
    ]
  },
  {
    slug:'saint-etienne', name:'Saint-Étienne', nameGentile:'Stéphanois', region:'Auvergne-Rhône-Alpes', dept:'42',
    pop:'174 000', distKm:580, driveH:6,
    angle:'ancienne capitale du charbon et du design industriel, aujourd\'hui ville créative',
    localDetail:`Saint-Étienne, désignée ville créative du design par l'UNESCO, a su se réinventer après son passé industriel. Sa population, pragmatique et attachée à la qualité, représente un marché sérieux pour les oiseaux exotiques bien documentés. La Loire dispose de bons vétérinaires aviaires, notamment à Saint-Étienne et dans l'agglomération stéphanoise.`,
    transport:`Saint-Étienne et la Loire (42) sont à environ 580 km de notre élevage de Llíria (6h de route). Nous livrons dans l'agglomération stéphanoise et dans tout le département 42, situé à proximité de Lyon.`,
    cityCTA:'Adopter un perroquet à Saint-Étienne',
    faqExtra:[
      {q:'Saint-Étienne est-elle couverte par votre service de livraison ?', a:'Oui, Saint-Étienne et tout le département de la Loire (42) font partie de notre zone de livraison régulière. Délai habituel : 2 à 3 jours ouvrés.'},
      {q:'Puis-je venir chercher mon oiseau directement en Espagne ?', a:'Oui, vous pouvez venir récupérer votre oiseau directement à notre élevage de Llíria (près de Valence, Espagne). Cela évite les frais de transport et vous permet de rencontrer l\'oiseau sur place avant de l\'emmener.'},
    ]
  },
  {
    slug:'toulon', name:'Toulon', nameGentile:'Toulonnais', region:'Provence-Alpes-Côte d\'Azur', dept:'83',
    pop:'174 000', distKm:490, driveH:5,
    angle:'grande base navale militaire et ville méditerranéenne du Var',
    localDetail:`Toulon, abritant la plus grande base navale de France, est une ville méditerranéenne avec une identité forte et une population attachée à sa région. Sa proximité avec notre élevage espagnol (moins de 5h de route, juste derrière Marseille) en fait l'une des destinations les plus rapides à desservir dans le Var. La douceur du climat provençal est idéale pour maintenir des perroquets en bonne santé.`,
    transport:`Toulon et le Var (83) sont à environ 490 km de Llíria (5h de route). Nous livrons régulièrement dans le Var et dans toute la région PACA. La proximité garantit un trajet court et confortable pour l'oiseau.`,
    cityCTA:'Adopter un perroquet à Toulon',
    faqExtra:[
      {q:'Livrez-vous dans le Var et sur la Côte d\'Azur du Var ?', a:'Oui, nous desservons Toulon, Hyères, La Seyne-sur-Mer, Fréjus et tout le département du Var (83).'},
      {q:'Le Var étant proche de l\'Espagne, la livraison est-elle plus rapide ?', a:'Oui, Toulon est l\'une des villes françaises les plus proches de notre élevage. Le trajet est court (~5h), ce qui réduit le stress de l\'oiseau pendant le transport.'},
    ]
  },
  {
    slug:'angers', name:'Angers', nameGentile:'Angevins', region:'Pays de la Loire', dept:'49',
    pop:'157 000', distKm:990, driveH:9,
    angle:'ville du roi René et capitale de l\'Anjou viticole',
    localDetail:`Angers, ancienne capitale des Plantagenêts, est une ville à taille humaine avec une qualité de vie reconnue et une forte culture des animaux de compagnie. Le Maine-et-Loire compte plusieurs vétérinaires spécialisés en NAC et une communauté de propriétaires de perroquets bien informée. La ville universitaire attire aussi des jeunes passionnés d'exotiques.`,
    transport:`Angers et le Maine-et-Loire (49) sont à environ 990 km de notre élevage (9h de route). Nous livrons dans toute la région Pays de la Loire via nos transporteurs partenaires certifiés transport d'animaux vivants.`,
    cityCTA:'Adopter un perroquet à Angers',
    faqExtra:[
      {q:'Livrez-vous en Maine-et-Loire ?', a:'Oui, nous livrons à Angers et dans tout le département du Maine-et-Loire (49), ainsi que dans les départements voisins des Pays de la Loire.'},
      {q:'Puis-je venir récupérer mon oiseau à mi-chemin ?', a:'Nous pouvons dans certains cas organiser un point de remise sur votre trajet si vous passez par notre région ou si vous planifiez un voyage en Espagne. Discutons-en par email.'},
    ]
  },
  {
    slug:'nimes', name:'Nîmes', nameGentile:'Nîmois', region:'Occitanie', dept:'30',
    pop:'151 000', distKm:440, driveH:4,
    angle:'cité romaine du Gard, entre Camargue et garrigue',
    localDetail:`Nîmes, dont les arènes antiques rivalisent avec celles de Rome, est une ville méditerranéenne à l'âme provençale. Sa proximité avec Montpellier et avec la frontière espagnole en fait l'une des destinations les plus accessibles depuis notre élevage de Llíria. Le Gard dispose d'un beau tissu vétérinaire pour les oiseaux exotiques et une communauté locale active.`,
    transport:`Nîmes et le Gard (30) sont à seulement 440 km de notre élevage de Llíria (4h de route environ). C'est l'une des destinations les plus proches parmi les grandes villes françaises, garantissant un transport court et confortable pour votre futur perroquet.`,
    cityCTA:'Adopter un perroquet à Nîmes',
    faqExtra:[
      {q:'Nîmes est-elle proche de votre élevage ?', a:'Oui, Nîmes est l\'une des villes françaises les plus proches de notre élevage : environ 440 km, soit ~4h de route. C\'est un avantage réel pour le bien-être de l\'oiseau lors du transport.'},
      {q:'Livrez-vous dans le Gard et en Occitanie ?', a:'Oui, nous desservons régulièrement Nîmes, Alès, Le Vigan et tout le Gard (30), ainsi que les départements voisins d\'Occitanie.'},
    ]
  },
  {
    slug:'villeurbanne', name:'Villeurbanne', nameGentile:'Villeurbannais', region:'Auvergne-Rhône-Alpes', dept:'69',
    pop:'150 000', distKm:520, driveH:'5,5',
    angle:'deuxième ville du Rhône, intégrée dans la métropole de Lyon',
    localDetail:`Villeurbanne, souvent présentée comme la "deuxième ville du Rhône" malgré son intégration dans la métropole lyonnaise, dispose d'une forte identité propre et d'une population diverse et ouverte aux animaux exotiques. Sa situation au cœur de la métropole de Lyon lui donne accès aux mêmes vétérinaires aviaires spécialisés que Lyon.`,
    transport:`Villeurbanne faisant partie de la métropole du Grand Lyon, les conditions de livraison sont identiques à celles de Lyon : environ 520 km depuis Llíria (5h30), avec livraison dans les 2 à 3 jours ouvrés après confirmation.`,
    cityCTA:'Adopter un perroquet à Villeurbanne',
    faqExtra:[
      {q:'La livraison à Villeurbanne est-elle la même qu\'à Lyon ?', a:'Oui, Villeurbanne étant intégrée dans la métropole lyonnaise, les conditions de livraison, les délais et les tarifs sont identiques à ceux de Lyon.'},
      {q:'Y a-t-il des vétérinaires aviaires à Villeurbanne ?', a:'Villeurbanne et la métropole lyonnaise disposent de plusieurs vétérinaires spécialisés en oiseaux exotiques. Nous pouvons vous recommander des praticiens dans votre secteur.'},
    ]
  },
  {
    slug:'clermont-ferrand', name:'Clermont-Ferrand', nameGentile:'Clermontois', region:'Auvergne-Rhône-Alpes', dept:'63',
    pop:'143 000', distKm:680, driveH:'6,5',
    angle:'capitale de l\'Auvergne au cœur des volcans du Massif Central',
    localDetail:`Clermont-Ferrand, ville volcanique dominée par la Chaîne des Puys (classée UNESCO), est la capitale d'une région au caractère bien trempé. La communauté auvergnate de passionnés d'oiseaux exotiques est sérieuse et exigeante — des qualités que partagent nos éleveurs. La ville abrite l'une des plus anciennes écoles vétérinaires de France, qui forme des spécialistes NAC reconnus.`,
    transport:`Clermont-Ferrand et le Puy-de-Dôme (63) sont à environ 680 km de notre élevage (6h30). Nous livrons dans toute l'Auvergne (63, 15, 43, 03) via nos partenaires logistiques spécialisés.`,
    cityCTA:'Adopter un perroquet à Clermont-Ferrand',
    faqExtra:[
      {q:'Livrez-vous en Auvergne ?', a:'Oui, nous couvrons Clermont-Ferrand et tout le Puy-de-Dôme (63), ainsi que les trois autres départements auvergnats (Cantal, Haute-Loire, Allier).'},
      {q:'Clermont-Ferrand dispose-t-elle de vétérinaires aviaires ?', a:'Oui, Clermont-Ferrand et sa région disposent de vétérinaires formés aux oiseaux exotiques, notamment grâce à la présence de l\'École Nationale Vétérinaire dans les environs.'},
    ]
  },
  {
    slug:'le-mans', name:'Le Mans', nameGentile:'Manceaux', region:'Pays de la Loire', dept:'72',
    pop:'143 000', distKm:1050, driveH:'9,5',
    angle:'ville des 24 Heures du Mans et capitale historique du Maine',
    localDetail:`Le Mans, mondialement connu pour ses 24 Heures automobiles, est une ville à taille humaine avec un bassin de vie étendu sur la Sarthe. Les Manceaux, passionnés de vitesse sur circuit mais aussi d'animaux de compagnie, représentent un marché fidèle pour les perroquets exotiques bien documentés. La ville dispose de vétérinaires spécialisés en NAC.`,
    transport:`Le Mans et la Sarthe (72) sont à environ 1 050 km de notre élevage (9h30). Nous livrons dans la Sarthe et dans les départements voisins (Mayenne, Maine-et-Loire, Orne) via notre réseau de transport.`,
    cityCTA:'Adopter un perroquet au Mans',
    faqExtra:[
      {q:'Livrez-vous dans la Sarthe ?', a:'Oui, nous desservons Le Mans et tout le département de la Sarthe (72), ainsi que les départements voisins des Pays de la Loire et de la Normandie.'},
      {q:'Comment garantissez-vous la santé de l\'oiseau pendant un transport de 9h ?', a:'Tout oiseau voyage dans une caisse de transport agréée, ventilée et sécurisée, avec nourriture et eau. Le transporteur est certifié pour les animaux vivants et effectue des contrôles réguliers.'},
    ]
  },
  {
    slug:'aix-en-provence', name:'Aix-en-Provence', nameGentile:'Aixois', region:'Provence-Alpes-Côte d\'Azur', dept:'13',
    pop:'143 000', distKm:480, driveH:5,
    angle:'ville de Cézanne et capitale culturelle de Provence',
    localDetail:`Aix-en-Provence, ville d'eaux, d'art et d'élégance, attire une population cultivée et aisée avec un fort pouvoir d'achat et un goût prononcé pour les animaux de compagnie rares. La proximité avec Marseille (30 km) et notre élevage espagnol (480 km, 5h) en fait une destination idéale pour un transport court et confortable.`,
    transport:`Aix-en-Provence et les Bouches-du-Rhône (13) sont à environ 480 km de notre élevage de Llíria (5h de route). La livraison dans l'agglomération aixoise et aux alentours est parmi les plus rapides de France.`,
    cityCTA:'Adopter un perroquet à Aix-en-Provence',
    faqExtra:[
      {q:'La livraison à Aix-en-Provence est-elle la même qu\'à Marseille ?', a:'Oui, Aix-en-Provence est dans le même département (13) que Marseille. Les conditions de livraison, les délais et la proximité avec notre élevage sont identiques.'},
      {q:'Livrez-vous dans le pays d\'Aix et dans les Bouches-du-Rhône ?', a:'Oui, nous desservons tout le pays d\'Aix-en-Provence et l\'ensemble des Bouches-du-Rhône, de Marseille à Arles en passant par Salon-de-Provence.'},
    ]
  },
  {
    slug:'brest', name:'Brest', nameGentile:'Brestois', region:'Bretagne', dept:'29',
    pop:'140 000', distKm:1300, driveH:12,
    angle:'grand port militaire et ville phare du Finistère',
    localDetail:`Brest, à la pointe de la Bretagne, est la ville la plus éloignée de notre élevage espagnol — mais cela ne freine pas l'enthousiasme de ses habitants pour les oiseaux exotiques. Les Brestois ont la réputation d'être des acheteurs informés et loyaux, qui font confiance à la documentation et à la réputation d'un éleveur sérieux plutôt qu'à la proximité géographique.`,
    transport:`Brest et le Finistère (29) se trouvent à environ 1 300 km de notre élevage de Llíria (12h de route) — la destination la plus lointaine que nous desservons régulièrement en France. Le transport est organisé avec la plus grande attention pour le bien-être de l'oiseau sur ce long trajet.`,
    cityCTA:'Adopter un perroquet à Brest',
    faqExtra:[
      {q:'Livrez-vous jusqu\'en Finistère malgré la distance ?', a:'Oui, nous livrons régulièrement en Bretagne, y compris à Brest et dans le Finistère (29). La distance (~1 300 km) est compensée par une organisation logistique rigoureuse et des pauses régulières pendant le transport.'},
      {q:'Puis-je venir chercher mon oiseau à mi-route ?', a:'Absolument. Si vous planifiez un voyage en Espagne, vous pouvez venir chercher votre oiseau directement à notre élevage de Llíria, ce qui évite les frais de transport et vous permet de rencontrer votre futur compagnon.'},
    ]
  },
  {
    slug:'tours', name:'Tours', nameGentile:'Tourangeaux', region:'Centre-Val de Loire', dept:'37',
    pop:'136 000', distKm:980, driveH:9,
    angle:'capitale du "jardin de la France" et cité du beau parler français',
    localDetail:`Tours, réputée pour parler le plus pur français de France selon une vieille tradition, est au cœur des châteaux de la Loire. La ville universitaire et touristique dispose d'une communauté de passionnés d'oiseaux exotiques sérieuse, avec plusieurs associations actives en Indre-et-Loire. La présence d'une école nationale vétérinaire à proximité d'Amboise enrichit le tissu de soins aviaires de la région.`,
    transport:`Tours et l'Indre-et-Loire (37) sont à environ 980 km de notre élevage (9h). Nous livrons dans tout le Centre-Val de Loire (37, 41, 28, 18, 36, 45) grâce à nos transporteurs partenaires.`,
    cityCTA:'Adopter un perroquet à Tours',
    faqExtra:[
      {q:'Livrez-vous en Indre-et-Loire et dans la vallée de la Loire ?', a:'Oui, nous desservons Tours et tout l\'Indre-et-Loire (37) ainsi que les autres départements du Centre-Val de Loire.'},
      {q:'Y a-t-il des vétérinaires spécialisés en oiseaux à Tours ?', a:'Oui, Tours et sa région disposent de vétérinaires formés aux oiseaux exotiques. Contactez-nous pour des recommandations locales.'},
    ]
  },
  {
    slug:'amiens', name:'Amiens', nameGentile:'Amiénois', region:'Hauts-de-France', dept:'80',
    pop:'133 000', distKm:1150, driveH:'10,5',
    angle:'capitale de la Picardie et ville de la cathédrale gothique la plus haute de France',
    localDetail:`Amiens, dont la cathédrale Notre-Dame est la plus vaste de France, est une ville au carrefour des routes du nord. Sa situation géographique en fait un hub naturel entre Paris, Lille et la côte normande. La Somme compte une communauté de propriétaires de perroquets fidèle, qui privilégie la qualité et la traçabilité à la prix.`,
    transport:`Amiens et la Somme (80) sont à environ 1 150 km de notre élevage (10h30). Nous livrons dans les Hauts-de-France via notre réseau de transporteurs certifiés animaux vivants.`,
    cityCTA:'Adopter un perroquet à Amiens',
    faqExtra:[
      {q:'Livrez-vous dans la Somme ?', a:'Oui, nous desservons Amiens et tout le département de la Somme (80), ainsi que les départements voisins des Hauts-de-France (Oise, Aisne, etc.).'},
      {q:'Amiens dispose-t-elle de vétérinaires pour les oiseaux exotiques ?', a:'Oui, Amiens et la Somme disposent de praticiens vétérinaires familiers avec les oiseaux exotiques. Nous pouvons vous orienter vers des spécialistes si besoin.'},
    ]
  },
  {
    slug:'limoges', name:'Limoges', nameGentile:'Limougeauds', region:'Nouvelle-Aquitaine', dept:'87',
    pop:'130 000', distKm:830, driveH:8,
    angle:'capitale mondiale de la porcelaine et du cuir fin',
    localDetail:`Limoges, dont la porcelaine est exportée dans le monde entier, est une ville d'artisanat et de savoir-faire. Les Limougeauds partagent cette même exigence de qualité et de durabilité dans leurs acquisitions — ce qui correspond parfaitement à notre approche de l'élevage responsable. La Haute-Vienne compte plusieurs vétérinaires compétents en NAC.`,
    transport:`Limoges et la Haute-Vienne (87) sont à environ 830 km de Llíria (8h). Nous livrons dans le Limousin (Haute-Vienne, Corrèze, Creuse) et en Nouvelle-Aquitaine via nos transporteurs partenaires.`,
    cityCTA:'Adopter un perroquet à Limoges',
    faqExtra:[
      {q:'Livrez-vous en Haute-Vienne et en Corrèze ?', a:'Oui, nous desservons Limoges et la Haute-Vienne (87), la Corrèze (19), la Creuse (23) et l\'ensemble de l\'ancienne région Limousin.'},
      {q:'Combien de temps prend la livraison à Limoges ?', a:'Depuis Llíria, le trajet vers Limoges dure environ 8 heures. La livraison est effectuée en 2 à 3 jours ouvrés après confirmation de commande.'},
    ]
  },
  {
    slug:'annecy', name:'Annecy', nameGentile:'Anneciens', region:'Auvergne-Rhône-Alpes', dept:'74',
    pop:'126 000', distKm:590, driveH:6,
    angle:'Venise des Alpes et ville au bord du lac le plus pur d\'Europe',
    localDetail:`Annecy, classée parmi les plus belles villes de France avec son lac cristallin et ses canaux fleuris, est un marché premium pour les animaux de compagnie d'exception. La Haute-Savoie, département à fort pouvoir d'achat et sensibilité écologique, apprécie particulièrement les éleveurs qui respectent les réglementations CITES et placent le bien-être animal au premier plan.`,
    transport:`Annecy et la Haute-Savoie (74) sont à environ 590 km de notre élevage de Llíria (6h). Nous livrons dans toute la Haute-Savoie et la Savoie, y compris les zones alpines, avec nos transporteurs partenaires.`,
    cityCTA:'Adopter un perroquet à Annecy',
    faqExtra:[
      {q:'Livrez-vous en Haute-Savoie et en Savoie ?', a:'Oui, nous desservons Annecy, Chambéry, Thonon-les-Bains, Bonneville et l\'ensemble des deux Savoies (74 et 73).'},
      {q:'Les perroquets supportent-ils le climat alpin d\'Annecy ?', a:'En intérieur chauffé, absolument. Les perroquets vivent à l\'intérieur et ne sont pas exposés aux températures extérieures. Le climat local ne pose aucun problème si l\'oiseau est correctement hébergé.'},
    ]
  },
  {
    slug:'perpignan', name:'Perpignan', nameGentile:'Perpignanais', region:'Occitanie', dept:'66',
    pop:'122 000', distKm:290, driveH:'3',
    angle:'ville catalane aux portes de l\'Espagne, la plus proche de notre élevage',
    localDetail:`Perpignan est la ville française la plus proche de notre élevage de Llíria (Espagne) : seulement 290 km et 3 heures de route sur l'autoroute A9. Cette proximité exceptionnelle garantit le trajet le plus court possible pour votre futur perroquet — un avantage décisif pour son bien-être. La culture catalane de Perpignan crée également des liens naturels avec nos équipes espagnoles.`,
    transport:`Perpignan et les Pyrénées-Orientales (66) bénéficient de la plus courte distance de livraison de toutes nos destinations françaises : seulement 290 km, 3 heures de route. C'est la ville française la plus proche de notre élevage de Llíria. La livraison peut parfois être assurée en 1 à 2 jours ouvrés.`,
    cityCTA:'Adopter un perroquet à Perpignan',
    faqExtra:[
      {q:'Perpignan est-elle la ville la plus proche de votre élevage en France ?', a:'Oui ! Avec seulement 290 km et environ 3 heures de route depuis notre élevage de Llíria (Valence, Espagne), Perpignan est la grande ville française la plus proche de nous. C\'est un avantage majeur pour minimiser le stress du transport.'},
      {q:'Puis-je venir chercher mon oiseau directement en Espagne depuis Perpignan ?', a:'Absolument — c\'est même l\'option la plus commode depuis Perpignan. Le trajet jusqu\'à Llíria ne prend que 3 heures. Vous pouvez visiter l\'élevage, rencontrer votre futur oiseau et repartir le même jour.'},
    ]
  },
  {
    slug:'metz', name:'Metz', nameGentile:'Messins', region:'Grand Est', dept:'57',
    pop:'118 000', distKm:1000, driveH:9,
    angle:'ville lumière de la Moselle et carrefour européen franco-luxembourgeois',
    localDetail:`Metz, ville d'art et d'histoire au confluent de la Moselle et de la Seille, est un carrefour européen entre France, Luxembourg et Allemagne. Son Centre Pompidou-Metz en fait une métropole culturelle de premier plan. La population messine, ouverte sur l'Europe, apprécie la dimension internationale de notre démarche et la rigueur de notre documentation CITES.`,
    transport:`Metz et la Moselle (57) sont à environ 1 000 km de notre élevage (9h). Nous livrons dans le Grand Est (57, 54, 55, 88) et jusqu'en Lorraine. La proximité du Luxembourg et de l'Allemagne ne change pas nos conditions pour les livraisons en France.`,
    cityCTA:'Adopter un perroquet à Metz',
    faqExtra:[
      {q:'Livrez-vous en Moselle et en Lorraine ?', a:'Oui, nous desservons Metz, Nancy et l\'ensemble de la Moselle (57), de la Meurthe-et-Moselle (54) et de la Meuse (55).'},
      {q:'Puis-je faire venir un oiseau depuis l\'Espagne si j\'habite près de la frontière luxembourgeoise ?', a:'Oui, la réglementation CITES s\'applique uniformément en France. Votre localisation frontalière n\'a aucune incidence sur les formalités, qui restent françaises.'},
    ]
  },
  {
    slug:'besancon', name:'Besançon', nameGentile:'Bisontins', region:'Bourgogne-Franche-Comté', dept:'25',
    pop:'116 000', distKm:820, driveH:8,
    angle:'capitale de la montre suisse à la française et ville natale de Victor Hugo',
    localDetail:`Besançon, berceau des industries horlogères françaises et ville natale de Victor Hugo, est une cité attachée à la précision et à l'excellence. Les Bisontins, sérieux et exigeants dans leurs choix, apprécient la rigueur documentaire et le soin que nous apportons à l'élevage de nos perroquets. La Franche-Comté, à la frontière suisse, développe une communauté aviaire active.`,
    transport:`Besançon et le Doubs (25) sont à environ 820 km de notre élevage de Llíria (8h de route). Nous livrons dans toute la Franche-Comté (25, 70, 39, 90) via nos transporteurs partenaires.`,
    cityCTA:'Adopter un perroquet à Besançon',
    faqExtra:[
      {q:'Livrez-vous dans le Doubs et en Franche-Comté ?', a:'Oui, nous desservons Besançon et tout le Doubs (25), ainsi que le Jura (39), la Haute-Saône (70) et le Territoire de Belfort (90).'},
      {q:'Combien de temps prend la livraison à Besançon ?', a:'Depuis Llíria, le trajet vers Besançon est d\'environ 820 km (8h). La livraison est effectuée en 2 à 3 jours ouvrés après confirmation de commande.'},
    ]
  },
  {
    slug:'orleans', name:'Orléans', nameGentile:'Orléanais', region:'Centre-Val de Loire', dept:'45',
    pop:'116 000', distKm:1000, driveH:9,
    angle:'ville de Jeanne d\'Arc et porte du Val de Loire',
    localDetail:`Orléans, libérée par Jeanne d'Arc en 1429 et première ville du Val de Loire inscrit au patrimoine mondial de l'UNESCO, est une métropole régionale à 1h15 de Paris. Sa position centrale en France et son dynamisme économique en font un marché attractif pour les animaux exotiques de qualité. Le Loiret compte plusieurs vétérinaires compétents en oiseaux exotiques.`,
    transport:`Orléans et le Loiret (45) sont à environ 1 000 km de notre élevage de Llíria (9h de route). Nous livrons dans le Centre-Val de Loire (45, 28, 18, 36, 37, 41) via nos partenaires logistiques spécialisés.`,
    cityCTA:'Adopter un perroquet à Orléans',
    faqExtra:[
      {q:'Livrez-vous dans le Loiret depuis l\'Espagne ?', a:'Oui, nous desservons Orléans et tout le Loiret (45), ainsi que les autres départements du Centre-Val de Loire.'},
      {q:'Orléans étant proche de Paris, puis-je passer chercher mon oiseau à Paris si vous y faites une livraison ?', a:'En principe, nous livrons directement à votre adresse. Si des regroupements de livraisons sont possibles, nous vous en informons.'},
    ]
  },
  {
    slug:'mulhouse', name:'Mulhouse', nameGentile:'Mulhousiens', region:'Grand Est', dept:'68',
    pop:'112 000', distKm:920, driveH:'8,5',
    angle:'ville industrielle alsacienne aux portes de la Suisse et de l\'Allemagne',
    localDetail:`Mulhouse, carrefour entre l'Alsace, la Suisse (Bâle est à 30 km) et l'Allemagne (Fribourg à 60 km), est une ville résolument ouverte sur l'Europe. Ses habitants, habitués aux échanges transfrontaliers, n'ont aucune appréhension vis-à-vis d'un achat auprès d'un éleveur espagnol — bien au contraire, ils apprécient la transparence documentaire internationale.`,
    transport:`Mulhouse et le Haut-Rhin (68) sont à environ 920 km de notre élevage de Llíria (8h30 de route). Nous livrons dans l'Alsace (67-68) et dans toute la région Grand Est.`,
    cityCTA:'Adopter un perroquet à Mulhouse',
    faqExtra:[
      {q:'Livrez-vous en Alsace, dans le Haut-Rhin ?', a:'Oui, nous desservons Mulhouse, Colmar, Strasbourg et tout le Bas-Rhin (67) et Haut-Rhin (68), ainsi que le reste du Grand Est.'},
      {q:'Puis-je faire livrer mon oiseau en Suisse si je suis frontalier de Mulhouse ?', a:'Nous livrons exclusivement en France. Pour une livraison en Suisse, les réglementations douanières sont différentes — contactez-nous pour discuter de votre situation.'},
    ]
  },
  {
    slug:'rouen', name:'Rouen', nameGentile:'Rouennais', region:'Normandie', dept:'76',
    pop:'112 000', distKm:1150, driveH:'10,5',
    angle:'capitale de la Normandie et ville de Jeanne d\'Arc au bord de la Seine',
    localDetail:`Rouen, ville-musée aux ruelles médiévales et aux clochers gothiques, est la capitale de la Normandie. Les Rouennais, à 1h30 de Paris et au cœur d'une région agricole prospère, manifestent un intérêt croissant pour les oiseaux exotiques de compagnie. La Seine-Maritime dispose d'un réseau vétérinaire complet, avec plusieurs praticiens formés aux NAC.`,
    transport:`Rouen et la Seine-Maritime (76) sont à environ 1 150 km de Llíria (10h30). Nous livrons dans toute la Normandie, incluant la Seine-Maritime, l'Eure et les trois autres départements normands.`,
    cityCTA:'Adopter un perroquet à Rouen',
    faqExtra:[
      {q:'Livrez-vous dans la Seine-Maritime et en Normandie ?', a:'Oui, nous desservons Rouen, Le Havre, Dieppe et tout le département de la Seine-Maritime (76), ainsi que l\'ensemble de la région Normandie.'},
      {q:'Y a-t-il des vétérinaires spécialisés en perroquets à Rouen ?', a:'Oui, Rouen et la Seine-Maritime disposent de vétérinaires expérimentés en oiseaux exotiques. Nous pouvons vous recommander des praticiens locaux.'},
    ]
  },
  {
    slug:'caen', name:'Caen', nameGentile:'Caennais', region:'Normandie', dept:'14',
    pop:'108 000', distKm:1200, driveH:11,
    angle:'ville mémorial et capitale du Calvados en Normandie',
    localDetail:`Caen, ville symbole de la mémoire du Débarquement de Normandie, est une cité universitaire dynamique avec une large population étudiante. Son Mémorial de la Paix est connu dans le monde entier. Le Calvados, département à l'identité forte, voit se développer une communauté croissante de passionnés d'oiseaux exotiques, notamment parmi les amateurs de nature et de biodiversité.`,
    transport:`Caen et le Calvados (14) sont à environ 1 200 km de notre élevage de Llíria (11h). Nous livrons dans tout le Calvados et en Normandie via nos transporteurs partenaires certifiés pour le transport d'animaux.`,
    cityCTA:'Adopter un perroquet à Caen',
    faqExtra:[
      {q:'Livrez-vous dans le Calvados et en Basse-Normandie ?', a:'Oui, nous desservons Caen et tout le Calvados (14), ainsi que la Manche (50), l\'Orne (61) et le reste de la Normandie.'},
      {q:'Combien de temps prend la livraison à Caen ?', a:'Depuis Llíria, le trajet vers Caen est d\'environ 1 200 km (11h). La livraison est effectuée en 2 à 4 jours ouvrés selon la disponibilité du transporteur.'},
    ]
  },
  {
    slug:'avignon', name:'Avignon', nameGentile:'Avignonnais', region:'Provence-Alpes-Côte d\'Azur', dept:'84',
    pop:'93 000', distKm:480, driveH:5,
    angle:'cité des papes et festival mondial de théâtre en Provence',
    localDetail:`Avignon, dont le Palais des Papes domine la plaine du Rhône, est une ville provençale à l'histoire millénaire. Son festival de théâtre international en fait chaque été l'une des capitales culturelles d'Europe. La proximité avec notre élevage espagnol (480 km, 5h de route) en fait une destination de livraison rapide avec un temps de transport minimal pour les oiseaux.`,
    transport:`Avignon et le Vaucluse (84) sont à environ 480 km de notre élevage de Llíria (5h). C'est l'une des destinations provençales les plus accessibles depuis l'Espagne. Nous livrons dans tout le Vaucluse et en région PACA.`,
    cityCTA:'Adopter un perroquet à Avignon',
    faqExtra:[
      {q:'Livrez-vous dans le Vaucluse ?', a:'Oui, nous desservons Avignon, Carpentras, Orange, Apt et tout le Vaucluse (84), ainsi que les départements voisins (Gard, Bouches-du-Rhône, Var, Alpes-de-Haute-Provence).'},
      {q:'Avignon est-elle proche de votre élevage espagnol ?', a:'Oui, avec environ 480 km et 5 heures de route, Avignon est bien desservie depuis Llíria. Le transport reste court et confortable pour l\'oiseau.'},
    ]
  },
  {
    slug:'poitiers', name:'Poitiers', nameGentile:'Poitevins', region:'Nouvelle-Aquitaine', dept:'86',
    pop:'90 000', distKm:910, driveH:'8,5',
    angle:'ville médiévale au cœur du Poitou, entre Loire et Garonne',
    localDetail:`Poitiers, ville universitaire millénaire qui accueillit la bataille arrêtant l'avancée arabe en 732, est un carrefour historique du Centre-Ouest français. Sa forte population étudiante et la présence d'une faculté des sciences crée un vivier d'amateurs d'animaux exotiques curieux et bien informés. La Vienne dispose de vétérinaires compétents en NAC.`,
    transport:`Poitiers et la Vienne (86) sont à environ 910 km de notre élevage de Llíria (8h30). Nous livrons dans la Vienne et dans les départements voisins de Nouvelle-Aquitaine.`,
    cityCTA:'Adopter un perroquet à Poitiers',
    faqExtra:[
      {q:'Livrez-vous dans la Vienne ?', a:'Oui, nous desservons Poitiers et tout le département de la Vienne (86), ainsi que les Deux-Sèvres (79), la Charente (16) et le reste de la Nouvelle-Aquitaine.'},
      {q:'Combien de temps dure la livraison à Poitiers ?', a:'Depuis notre élevage, le trajet vers Poitiers est d\'environ 910 km (8h30). La livraison s\'effectue en 2 à 3 jours ouvrés après confirmation.'},
    ]
  },
  {
    slug:'la-rochelle', name:'La Rochelle', nameGentile:'Rochelais', region:'Nouvelle-Aquitaine', dept:'17',
    pop:'77 000', distKm:960, driveH:9,
    angle:'port historique charentais et capitale de l\'Atlantique français',
    localDetail:`La Rochelle, cité maritime et touristique de renom, affiche une culture de l'ouverture et de la mobilité internationale. Ses habitants, souvent voyageurs et curieux du monde, sont naturellement attirés par les oiseaux exotiques. La ville dispose d'un vétérinaire spécialisé en NAC reconnu dans la région Charente-Maritime.`,
    transport:`La Rochelle et la Charente-Maritime (17) sont à environ 960 km de Llíria (9h). Nous livrons sur toute la côte atlantique charentaise et dans l'arrière-pays via nos partenaires logistiques spécialisés.`,
    cityCTA:'Adopter un perroquet à La Rochelle',
    faqExtra:[
      {q:'Livrez-vous en Charente-Maritime ?', a:'Oui, nous desservons La Rochelle, Saintes, Rochefort et tout le département de la Charente-Maritime (17), ainsi que la Charente (16) et les Deux-Sèvres (79).'},
      {q:'Les oiseaux supportent-ils un transport de 9h ?', a:'Oui, à condition que le transport soit organisé correctement — caisse agréée, ventilée, nourriture et eau disponibles, transporteur certifié animaux vivants. Nous n\'organisons jamais un transport sans ces garanties.'},
    ]
  },
  {
    slug:'pau', name:'Pau', nameGentile:'Palois', region:'Nouvelle-Aquitaine', dept:'64',
    pop:'77 000', distKm:590, driveH:'5,5',
    angle:'ville béarnaise au pied des Pyrénées et berceau d\'Henri IV',
    localDetail:`Pau, ville pyrénéenne sur les contreforts de la chaîne, offre une qualité de vie enviée et une clientèle aisée attirée par les activités de plein air et par les animaux rares. Sa proximité avec l'Espagne (frontière à seulement 50 km) et avec notre élevage de Llíria (590 km, 5h30) en fait une destination bien desservie depuis la péninsule ibérique.`,
    transport:`Pau et les Pyrénées-Atlantiques (64) sont à environ 590 km de notre élevage de Llíria (5h30). La proximité de la frontière espagnole facilite les livraisons dans le Pays Basque et le Béarn.`,
    cityCTA:'Adopter un perroquet à Pau',
    faqExtra:[
      {q:'Livrez-vous dans les Pyrénées-Atlantiques ?', a:'Oui, nous desservons Pau, Bayonne, Biarritz et tout le département des Pyrénées-Atlantiques (64), qu\'il s\'agisse du Pays Basque ou du Béarn.'},
      {q:'Pau étant proche de l\'Espagne, puis-je aller chercher mon oiseau directement à votre élevage ?', a:'Absolument. Depuis Pau, notre élevage de Llíria (Valence, Espagne) est à environ 5h30 de route — tout à fait faisable en aller-retour dans la journée.'},
    ]
  },
  {
    slug:'chambery', name:'Chambéry', nameGentile:'Chambériens', region:'Auvergne-Rhône-Alpes', dept:'73',
    pop:'68 000', distKm:620, driveH:6,
    angle:'ancienne capitale du Duché de Savoie et porte des Alpes',
    localDetail:`Chambéry, au cœur de la Savoie entre lac du Bourget et massifs alpins, est une ville à taille humaine avec un fort attrait pour les amateurs d'animaux exotiques cultivés et exigeants. Le département de la Savoie, à fort pouvoir d'achat, dispose d'une clientèle sérieuse qui valorise la traçabilité CITES et la santé garantie des oiseaux.`,
    transport:`Chambéry et la Savoie (73) sont à environ 620 km de notre élevage de Llíria (6h). Nous livrons dans les deux Savoies (73-74) et dans les zones alpines voisines (Isère, Ain).`,
    cityCTA:'Adopter un perroquet à Chambéry',
    faqExtra:[
      {q:'Livrez-vous en Savoie ?', a:'Oui, nous desservons Chambéry, Albertville, Aix-les-Bains et tout le département de la Savoie (73), ainsi que la Haute-Savoie (74).'},
      {q:'Le climat de montagne de Chambéry est-il adapté aux perroquets ?', a:'En intérieur chauffé, oui. Les perroquets vivent à l\'intérieur et sont protégés du froid alpin. Le chauffage domestique standard suffit pour maintenir une température confortable pour votre oiseau.'},
    ]
  },
  {
    slug:'colmar', name:'Colmar', nameGentile:'Colmariens', region:'Grand Est', dept:'68',
    pop:'67 000', distKm:970, driveH:'9',
    angle:'capitale des vins d\'Alsace et cité médiévale de la route des vins',
    localDetail:`Colmar, avec ses maisons à colombages multicolores reflétées dans les canaux de la Petite Venise, est l'une des villes les plus pittoresques de France. Sa culture alsacienne profonde et son attachement à la qualité correspondent à notre philosophie d'élevage artisanal. La région de Colmar compte des amateurs de perroquets bien organisés, souvent en lien avec les clubs ornithologiques du Haut-Rhin.`,
    transport:`Colmar et le Haut-Rhin (68) sont à environ 970 km de notre élevage de Llíria (9h de route). Nous livrons dans l'Alsace (67-68) et dans toute la région Grand Est via nos transporteurs partenaires.`,
    cityCTA:'Adopter un perroquet à Colmar',
    faqExtra:[
      {q:'Livrez-vous dans le Haut-Rhin depuis l\'Espagne ?', a:'Oui, nous desservons Colmar, Mulhouse, Guebwiller et tout le Haut-Rhin (68). La livraison s\'effectue en 2 à 3 jours ouvrés après confirmation.'},
      {q:'Y a-t-il des associations d\'oiseaux en Alsace ?', a:'Oui, l\'Alsace dispose de clubs ornithologiques actifs, notamment dans le Haut-Rhin. Nous pouvons vous mettre en contact avec des propriétaires locaux si vous le souhaitez.'},
    ]
  },
  {
    slug:'valence', name:'Valence', nameGentile:'Valentinois', region:'Auvergne-Rhône-Alpes', dept:'26',
    pop:'65 000', distKm:510, driveH:'5,5',
    angle:'capitale de la Drôme et porte de la Provence dans la vallée du Rhône',
    localDetail:`Valence, ville-carrefour entre Lyon et Marseille sur l'axe rhodanien, marque l'entrée de la Provence dans le couloir du Rhône. Son statut de ville de passage et son dynamisme commercial en font un marché actif pour les oiseaux exotiques. La Drôme, entre Ardèche et Vercors, développe une communauté de passionnés attachés à la nature et au respect du vivant.`,
    transport:`Valence-sur-Rhône et la Drôme (26) sont à environ 510 km de notre élevage de Llíria (5h30 de route). C'est l'une des destinations les plus proches dans la vallée du Rhône. Nous livrons dans la Drôme et l'Ardèche voisine.`,
    cityCTA:'Adopter un perroquet à Valence',
    faqExtra:[
      {q:'Livrez-vous dans la Drôme et l\'Ardèche ?', a:'Oui, nous desservons Valence, Romans-sur-Isère, Montélimar et tout le département de la Drôme (26), ainsi que l\'Ardèche (07).'},
      {q:'Valence (Drôme) est-elle différente de Valence (Espagne) ?', a:'Oui, elles n\'ont aucun rapport ! Notre élevage est situé à Llíria, dans la province de Valencia en Espagne. La Valence française (Drôme) est une de nos villes de livraison, à ~510 km de chez nous.'},
    ]
  },
  {
    slug:'bayonne', name:'Bayonne', nameGentile:'Bayonnais', region:'Nouvelle-Aquitaine', dept:'64',
    pop:'52 000', distKm:650, driveH:6,
    angle:'capitale du Pays Basque français et ville du jambon et du chocolat',
    localDetail:`Bayonne, au confluent de l'Adour et de la Nive, est le cœur pulsant du Pays Basque français. Sa culture forte, son bilinguisme franco-basque et sa vitalité économique en font une ville unique. La proximité avec l'Espagne (Saint-Sébastien est à 45 minutes) et avec notre élevage (650 km, 6h) est un avantage naturel pour les livraisons dans la zone Pyrénées-Atlantiques.`,
    transport:`Bayonne et les Pyrénées-Atlantiques (64) sont à environ 650 km de notre élevage de Llíria (6h). La proximité avec la frontière espagnole facilite les échanges. Nous livrons dans tout le Pays Basque et le Béarn.`,
    cityCTA:'Adopter un perroquet à Bayonne',
    faqExtra:[
      {q:'Livrez-vous dans le Pays Basque français ?', a:'Oui, nous desservons Bayonne, Biarritz, Anglet, Hendaye et l\'ensemble du littoral et de l\'intérieur basque dans les Pyrénées-Atlantiques (64).'},
      {q:'Bayonne étant proche de l\'Espagne, la livraison est-elle plus rapide ?', a:'Oui, depuis notre élevage de Llíria, Bayonne est à seulement 6 heures de route. C\'est une des villes françaises les mieux desservies par notre circuit de livraison.'},
    ]
  },
  {
    slug:'lorient', name:'Lorient', nameGentile:'Lorientais', region:'Bretagne', dept:'56',
    pop:'57 000', distKm:1200, driveH:11,
    angle:'ville de la marine nationale et festival interceltique au Morbihan',
    localDetail:`Lorient, dont le festival interceltique rassemble chaque août des centaines de milliers de visiteurs du monde entier, est une ville ouverte à la diversité culturelle. Les Lorientais, marins dans l'âme, sont attirés par les oiseaux exotiques qui rappellent les contrées lointaines. Le Morbihan dispose d'un tissu vétérinaire solide pour les NAC.`,
    transport:`Lorient et le Morbihan (56) sont à environ 1 200 km de notre élevage de Llíria (11h). Nous livrons dans tout le Morbihan et en Bretagne via nos transporteurs partenaires spécialisés.`,
    cityCTA:'Adopter un perroquet à Lorient',
    faqExtra:[
      {q:'Livrez-vous dans le Morbihan ?', a:'Oui, nous desservons Lorient, Vannes, Quimper et tout le Morbihan (56), ainsi que les autres départements bretons.'},
      {q:'Comment garantissez-vous le bien-être de l\'oiseau sur un trajet de 11 heures ?', a:'L\'oiseau voyage dans une caisse de transport agréée, avec nourriture, eau et ventilation. Le transporteur certifié effectue des pauses régulières. Nous n\'expédions jamais un oiseau sans ces garanties.'},
    ]
  },
  {
    slug:'troyes', name:'Troyes', nameGentile:'Troyens', region:'Grand Est', dept:'10',
    pop:'61 000', distKm:970, driveH:9,
    angle:'capitale historique du comté de Champagne et ville du textile',
    localDetail:`Troyes, dont le plan médiévale en forme de bouchon de champagne reste intact dans ses rues piétonnes, est une ville de commerce et d'histoire. Ses outlets de mode attirent des visiteurs du monde entier, mais c'est aussi une ville où la qualité prime — une valeur partagée par nos éleveurs. L'Aube dispose d'une communauté de passionnés d'oiseaux exotiques organisée.`,
    transport:`Troyes et l'Aube (10) sont à environ 970 km de notre élevage (9h). Nous livrons dans l'Aube et dans le Grand Est via nos transporteurs partenaires agréés.`,
    cityCTA:'Adopter un perroquet à Troyes',
    faqExtra:[
      {q:'Livrez-vous dans l\'Aube ?', a:'Oui, nous desservons Troyes et tout le département de l\'Aube (10), ainsi que la Haute-Marne (52), la Marne (51) et le reste du Grand Est.'},
      {q:'Combien de temps dure le transport jusqu\'à Troyes ?', a:'Depuis Llíria, le trajet vers Troyes représente environ 970 km et 9 heures de route. La livraison s\'effectue en 2 à 3 jours ouvrés.'},
    ]
  },
  {
    slug:'cannes', name:'Cannes', nameGentile:'Cannois', region:'Provence-Alpes-Côte d\'Azur', dept:'06',
    pop:'74 000', distKm:550, driveH:'5,5',
    angle:'capitale mondiale du cinéma et palais des festivals sur la Croisette',
    localDetail:`Cannes, symbole du glamour et du luxe international, attire une clientèle internationale aisée avec un pouvoir d'achat parmi les plus élevés d'Europe. Les Cannois, habitués à l'excellence dans tous les domaines, sont particulièrement sensibles à la qualité d'élevage, à la rigueur documentaire et à l'exclusivité des espèces proposées. La Côte d'Azur dispose d'un réseau vétérinaire aviaire d'excellence.`,
    transport:`Cannes et les Alpes-Maritimes (06) sont à environ 550 km de notre élevage de Llíria (5h30). Nous livrons sur la Côte d'Azur, de Cannes à Menton, via nos transporteurs partenaires certifiés.`,
    cityCTA:'Adopter un perroquet à Cannes',
    faqExtra:[
      {q:'Livrez-vous à Cannes et sur la Côte d\'Azur ?', a:'Oui, nous desservons Cannes, Nice, Antibes, Juan-les-Pins, Grasse et tout le département des Alpes-Maritimes (06).'},
      {q:'Proposez-vous des espèces rares pour une clientèle exigeante ?', a:'Absolument. Des espèces comme l\'Ara Hyacinthe (CITES Annexe I), le Gris du Gabon ou l\'Éclectus sont disponibles sur demande. Contactez-nous pour les espèces les plus exclusives.'},
    ]
  },
  {
    slug:'antibes', name:'Antibes', nameGentile:'Antibois', region:'Provence-Alpes-Côte d\'Azur', dept:'06',
    pop:'77 000', distKm:545, driveH:'5,5',
    angle:'ville de Picasso et capitale de la plaisance sur la Côte d\'Azur',
    localDetail:`Antibes, entre Cannes et Nice, est une ville méditerranéenne alliant patrimoine historique et art de vivre contemporain. Son port de plaisance est l'un des plus fréquentés d'Europe. La population d'Antibes, très internationale, apprécie la qualité des oiseaux élevés à la main et la transparence des éleveurs qui respectent rigoureusement les réglementations CITES.`,
    transport:`Antibes et les Alpes-Maritimes (06) sont à environ 545 km de notre élevage de Llíria (5h30). Les conditions de livraison sont les mêmes que pour Cannes et Nice.`,
    cityCTA:'Adopter un perroquet à Antibes',
    faqExtra:[
      {q:'Antibes et Cannes sont-elles dans la même zone de livraison ?', a:'Oui, Antibes, Cannes, Nice et toutes les villes des Alpes-Maritimes (06) font partie de la même zone de livraison, avec les mêmes délais et conditions.'},
      {q:'Livrez-vous à Monaco depuis Antibes ?', a:'Nous livrons en France métropolitaine. Pour Monaco, contactez-nous directement — chaque demande est étudiée individuellement.'},
    ]
  },
  {
    slug:'narbonne', name:'Narbonne', nameGentile:'Narbonnais', region:'Occitanie', dept:'11',
    pop:'58 000', distKm:330, driveH:3,
    angle:'ancienne capitale romaine de la Gaule narbonnaise et cité viticole',
    localDetail:`Narbonne, fondée par les Romains en 118 avant J.-C., est l'une des plus anciennes villes de France. Sa position stratégique entre Montpellier et Perpignan, sur l'axe autoroutier A9 reliant l'Espagne à la France, en fait l'une des villes les plus proches de notre élevage espagnol. À seulement 330 km et 3 heures de route de Llíria, Narbonne bénéficie de l'un des transports les plus courts que nous organisons.`,
    transport:`Narbonne et l'Aude (11) sont à environ 330 km de notre élevage de Llíria — l'une des distances les plus courtes parmi nos villes de livraison françaises (3h de route). Le transport est court et confortable pour l'oiseau. Nous livrons dans l'Aude et en Occitanie.`,
    cityCTA:'Adopter un perroquet à Narbonne',
    faqExtra:[
      {q:'Narbonne est-elle proche de votre élevage ?', a:'Très proche. Narbonne est à seulement 330 km de notre élevage de Llíria (Espagne), soit environ 3 heures de route sur l\'A9. C\'est l\'une des villes françaises les mieux placées pour recevoir nos livraisons.'},
      {q:'Livrez-vous dans l\'Aude ?', a:'Oui, nous desservons Narbonne, Carcassonne et tout le département de l\'Aude (11), ainsi que les départements voisins (Hérault, Gard, Pyrénées-Orientales).'},
    ]
  },
  {
    slug:'montauban', name:'Montauban', nameGentile:'Montalbanais', region:'Occitanie', dept:'82',
    pop:'61 000', distKm:440, driveH:4,
    angle:'ville rose du Tarn-et-Garonne entre Toulouse et Agen',
    localDetail:`Montauban, ville rose du Tarn-et-Garonne entre Toulouse et Agen, est un marché agricole prospère au cœur du Quercy et de la Gascogne. Sa proximité avec Toulouse et avec notre élevage espagnol (440 km, 4h) la place dans la zone de livraison rapide du Sud-Ouest. Les amateurs de perroquets de Montauban bénéficient de la même accessibilité logistique que les Toulousains.`,
    transport:`Montauban et le Tarn-et-Garonne (82) sont à environ 440 km de notre élevage de Llíria (4h de route). C'est une des destinations les plus proches du grand Sud-Ouest. Nous livrons dans le 82 et les départements voisins (Lot, Tarn, Gers, Lot-et-Garonne).`,
    cityCTA:'Adopter un perroquet à Montauban',
    faqExtra:[
      {q:'Livrez-vous dans le Tarn-et-Garonne ?', a:'Oui, nous desservons Montauban et tout le département du Tarn-et-Garonne (82), ainsi que les départements voisins (Lot, Tarn, Gers, Lot-et-Garonne).'},
      {q:'Montauban est-elle proche de votre élevage ?', a:'Oui, avec environ 440 km et 4 heures de route, Montauban est dans la zone de livraison rapide du Sud-Ouest, comparable à Toulouse.'},
    ]
  },
  {
    slug:'beziers', name:'Béziers', nameGentile:'Biterrois', region:'Occitanie', dept:'34',
    pop:'80 000', distKm:350, driveH:'3,5',
    angle:'capitale de la vigne et du rugby dans l\'Hérault méditerranéen',
    localDetail:`Béziers, ville du rugby et du vin dans l'Hérault, est une cité méditerranéenne au caractère affirmé. Avec ses 350 km depuis notre élevage espagnol (3h30 de route sur l'A9), Béziers est l'une des villes françaises les mieux placées pour recevoir nos livraisons avec un minimum de stress pour les oiseaux. La communauté biterroise de passionnés d'exotiques est active et bien informée.`,
    transport:`Béziers et l'Hérault (34) sont à environ 350 km de notre élevage de Llíria — parmi les distances les plus courtes de nos destinations françaises (3h30). Le transport est court et confortable. Nous livrons dans l'Hérault et dans tout le Languedoc.`,
    cityCTA:'Adopter un perroquet à Béziers',
    faqExtra:[
      {q:'Béziers est-elle proche de votre élevage ?', a:'Très proche. Béziers est à seulement 350 km de notre élevage de Llíria (Espagne), soit ~3h30 sur l\'A9. C\'est l\'une des villes françaises avec la plus courte distance de livraison.'},
      {q:'Livrez-vous dans l\'Hérault autour de Béziers ?', a:'Oui, nous desservons Béziers, Agde, Pézenas, Sète et tout l\'Hérault (34), ainsi que les départements voisins (Aude, Gard, Hérault).'},
    ]
  },
];

// ─── ALL 50 CITIES INDEX (for cross-linking) ─────────────────────────────────
const ALL_CITY_LINKS = CITIES.map(c => `<a href="https://www.paraisodeaves.com/fr/perroquets-a-vendre-${c.slug}/" class="city-chip">📍 ${c.name}</a>`).join('');

// ─── SPECIES LINKS ────────────────────────────────────────────────────────────
const SPECIES_LINKS = [
  {href:'/fr/especies/perroquet-gris-du-gabon', label:'Gris du Gabon'},
  {href:'/fr/especies/ara-hyacinthe', label:'Ara Hyacinthe'},
  {href:'/fr/especies/ara-bleu-et-jaune', label:'Ara Bleu et Jaune'},
  {href:'/fr/especies/ara-macao', label:'Ara Macao'},
  {href:'/fr/especies/ara-chloroptere', label:'Ara Chloroptère'},
  {href:'/fr/especies/cacatoes-huppe-jaune', label:'Cacatoès Huppé Jaune'},
  {href:'/fr/especies/cacatoes-rosalbin', label:'Cacatoès Rosalbin'},
  {href:'/fr/especies/amazone-front-bleu', label:'Amazone à Front Bleu'},
  {href:'/fr/especies/eclectus', label:'Éclectus'},
];

function speciesCards() {
  return SPECIES_LINKS.map(s => `
        <div class="species-card">
          <div class="icon">🦜</div>
          <h4><a href="https://www.paraisodeaves.com${s.href}/">${s.label}</a></h4>
          <span>Prix sur demande</span>
        </div>`).join('');
}

function speciesSidebarLinks() {
  return SPECIES_LINKS.map(s => `<li><a href="https://www.paraisodeaves.com${s.href}/">${s.label}</a></li>`).join('\n        ');
}

// ─── STANDARD FAQS (8 minimum, common to all cities) ─────────────────────────
function standardFaqs(city) {
  return [
    {
      q:`Livrez-vous des perroquets à ${city.name} ?`,
      a:`Oui, Paraíso de Aves livre régulièrement à ${city.name} et dans le département ${city.dept} (${city.region}). Le transport est organisé par des partenaires certifiés pour les animaux vivants, avec toute la documentation CITES en règle.`
    },
    {
      q:`Combien de temps dure la livraison d'un perroquet à ${city.name} ?`,
      a:`Le délai habituel est de 2 à 4 jours ouvrés après confirmation de commande et paiement. Depuis notre élevage de Llíria (Espagne), ${city.name} est à environ ${city.distKm} km. Nous vous communiquons la date de livraison précise par email.`
    },
    {
      q:'Les perroquets sont-ils livrés avec leurs documents CITES ?',
      a:'Absolument. Tout oiseau vendu par Paraíso de Aves est accompagné de son certificat CITES officiel (Annexe I ou II selon l\'espèce), de son identification légale (bague ou transpondeur) et d\'un certificat de santé vétérinaire. Nous ne livrons jamais un oiseau sans documentation complète.'
    },
    {
      q:`Comment s'assurer que l'éleveur est sérieux avant d'acheter à distance ?`,
      a:`Nous vous envoyons des photos et vidéos réelles de l\'oiseau spécifique avant toute décision. Nous partageons notre numéro d\'autorisation d\'élevage, nos certifications CITES et les références de clients dans votre région. Aucun paiement ne vous est demandé avant que vous soyez pleinement satisfait des informations reçues.`
    },
    {
      q:'Quel est le prix d\'un perroquet livré en France ?',
      a:'Les prix varient selon l\'espèce et la rareté de l\'oiseau. Nous ne les affichons pas en ligne — contactez-nous par email (paraisodeloros@gmail.com) pour recevoir un devis personnalisé incluant le prix de l\'oiseau, les frais de transport et la documentation.'
    },
    {
      q:'L\'oiseau est-il sevré et apprivoisé à la livraison ?',
      a:'Oui. Tous nos oiseaux sont élevés à la main depuis le nid, complètement sevrés et habitués au contact humain quotidien avant d\'être proposés à l\'adoption. Vous recevez un oiseau confiant, manipulable et prêt à s\'intégrer dans votre foyer.'
    },
    {
      q:'Qu\'est-ce que la CITES et pourquoi est-ce important ?',
      a:'La CITES (Convention sur le Commerce International des Espèces de faune et de flore sauvages Menacées d\'extinction) est un accord international qui réglemente le commerce des espèces protégées. En France, détenir un perroquet de l\'Annexe I ou II sans documentation CITES est illégal et expose à de lourdes sanctions. Chez Paraíso de Aves, chaque oiseau est fourni avec ses documents officiels CITES.'
    },
    {
      q:`Comment se passe le processus d'adoption depuis ${city.name} ?`,
      a:`1. Contactez-nous par email (paraisodeloros@gmail.com) pour indiquer l'espèce souhaitée. 2. Nous vous envoyons les photos/vidéos de l'oiseau disponible avec le devis complet. 3. Après accord, nous organisons le transport jusqu'à ${city.name}. 4. Vous recevez l'oiseau avec tous ses documents CITES. 5. Nous assurons un suivi post-adoption.`
    },
  ];
}

// ─── PAGE GENERATOR ───────────────────────────────────────────────────────────
function generatePage(city) {
  const allFaqs = [...standardFaqs(city), ...city.faqExtra];
  const url = `https://www.paraisodeaves.com/fr/perroquets-a-vendre-${city.slug}/`;
  const seoTitle = `Perroquets à Vendre à ${city.name} | Éleveur CITES | Paraíso de Aves`;
  const metaDesc = `Achetez un perroquet à ${city.name} : Gris du Gabon, Ara, Cacatoès, Amazone. Élevage espagnol CITES, élevés à la main, livraison en ${city.region}. Prix sur demande.`;
  const h1 = `Perroquets à Vendre à ${city.name}`;

  // FAQ schema JSON
  const faqSchema = allFaqs.map(f => `    {
      "@type": "Question",
      "name": "${f.q.replace(/"/g,'\\"')}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${f.a.replace(/"/g,'\\"')}"
      }
    }`).join(',\n');

  // FAQ HTML
  const faqHtml = allFaqs.map(f => `
        <div class="faq-item">
          <div class="faq-q">${f.q}</div>
          <div class="faq-a">${f.a}</div>
        </div>`).join('');

  // Other cities (exclude current, show 16 others)
  const otherCities = CITIES.filter(c => c.slug !== city.slug).slice(0,16)
    .map(c => `<a href="https://www.paraisodeaves.com/fr/perroquets-a-vendre-${c.slug}/" class="city-chip">📍 ${c.name}</a>`).join('');

  return `<!DOCTYPE html>
<html lang="fr-FR" dir="ltr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4007YHH4H9"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-4007YHH4H9');</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3219055968593295" crossorigin="anonymous"></script>
  <title>${seoTitle}</title>
  <meta name="description" content="${metaDesc}"/>
  <meta name="robots" content="index, follow"/>
  <link rel="canonical" href="${url}"/>
  <link rel="alternate" hreflang="fr-FR" href="${url}"/>
  <link rel="alternate" hreflang="es-ES" href="https://www.paraisodeaves.com/"/>
  <link rel="alternate" hreflang="x-default" href="https://www.paraisodeaves.com/"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="fr_FR"/>
  <meta property="og:title" content="${seoTitle}"/>
  <meta property="og:description" content="${metaDesc}"/>
  <meta property="og:url" content="${url}"/>
  <meta property="og:image" content="https://www.paraisodeaves.com/uploaded-macaw.webp"/>
  <meta property="og:site_name" content="Paraíso de Aves"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${seoTitle}"/>
  <meta name="twitter:description" content="${metaDesc}"/>
  <link rel="icon" href="/favicon.ico"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>

  <script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${h1}",
  "description": "${metaDesc}",
  "url": "${url}",
  "inLanguage": "fr-FR",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type":"ListItem","position":1,"name":"Accueil","item":"https://www.paraisodeaves.com/fr/"},
      {"@type":"ListItem","position":2,"name":"Villes","item":"https://www.paraisodeaves.com/fr/"},
      {"@type":"ListItem","position":3,"name":"Perroquets à ${city.name}","item":"${url}"}
    ]
  }
}</script>
  <script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Paraíso de Aves — Livraison à ${city.name}",
  "description": "Élevage de perroquets et oiseaux exotiques à Llíria (Espagne). Livraison avec documentation CITES à ${city.name} et en ${city.region}.",
  "url": "https://www.paraisodeaves.com/fr/",
  "email": "paraisodeloros@gmail.com",
  "areaServed": {"@type": "City", "name": "${city.name}", "containedInPlace": {"@type": "AdministrativeArea", "name": "${city.region}"}},
  "serviceType": "Vente et livraison de perroquets et oiseaux exotiques avec documentation CITES",
  "priceRange": "Prix sur demande",
  "openingHours": "Mo-Sa 09:00-19:00",
  "address": {"@type": "PostalAddress", "addressLocality": "Llíria", "addressRegion": "Valencia", "addressCountry": "ES"}
}</script>
  <script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type":"ListItem","position":1,"name":"Accueil","item":"https://www.paraisodeaves.com/fr/"},
    {"@type":"ListItem","position":2,"name":"Nos Villes","item":"https://www.paraisodeaves.com/fr/"},
    {"@type":"ListItem","position":3,"name":"Perroquets à ${city.name}","item":"${url}"}
  ]
}</script>
  <script type="application/ld+json">{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
${faqSchema}
  ]
}</script>

  <style>
  :root{--primary:#1F3D2B;--secondary:#2B533C;--gold:#D4A94F;--gold-light:#E0B75F;--bg:#F8F5F0;--text:#1A1A1A;--muted:#5C5C5C;--border:#E7E0D2;--white:#fff;--radius:12px;--shadow:0 4px 24px rgba(0,0,0,.10);}
  *{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
  body{font-family:'Open Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.75;font-size:16px;}
  h1,h2,h3,h4{font-family:'Poppins',sans-serif;font-weight:700;line-height:1.25;}
  a{color:var(--primary);text-decoration:none;}a:hover{color:var(--gold);}
  img{max-width:100%;height:auto;display:block;}
  .topbar{background:var(--primary);position:sticky;top:0;z-index:1000;padding:0 5%;}
  .topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:1200px;margin:0 auto;}
  .logo{color:var(--white);font-family:'Poppins',sans-serif;font-weight:700;font-size:1.1rem;display:flex;align-items:center;gap:8px;}
  nav a{color:rgba(255,255,255,.85);margin-left:22px;font-size:.9rem;font-weight:500;transition:color .2s;}
  nav a:hover{color:var(--gold);}
  .breadcrumb-bar{background:var(--primary);padding:10px 5%;border-bottom:1px solid rgba(255,255,255,.08);}
  .breadcrumb-bar .inner{max-width:1200px;margin:0 auto;font-size:.82rem;color:rgba(255,255,255,.6);}
  .breadcrumb-bar .inner a{color:rgba(255,255,255,.7);}
  .breadcrumb-bar .inner a:hover{color:var(--gold);}
  .breadcrumb-bar .inner span{margin:0 6px;}
  .hero{background:linear-gradient(135deg,var(--primary) 0%,var(--secondary) 100%);padding:64px 5%;text-align:center;color:var(--white);}
  .hero .badge{display:inline-block;background:rgba(212,169,79,.15);border:1px solid var(--gold);color:var(--gold);padding:6px 20px;border-radius:30px;font-size:.8rem;font-weight:700;letter-spacing:1px;margin-bottom:18px;}
  .hero h1{font-size:clamp(1.9rem,5vw,3rem);margin-bottom:12px;color:var(--white);}
  .hero .subtitle{font-size:1.05rem;color:rgba(255,255,255,.85);max-width:660px;margin:0 auto 24px;}
  .trust-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:10px;}
  .trust-pills span{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:var(--white);padding:6px 16px;border-radius:20px;font-size:.82rem;font-weight:600;}
  .page-wrap{max-width:1200px;margin:0 auto;padding:56px 5%;display:grid;grid-template-columns:1fr 320px;gap:48px;align-items:start;}
  @media(max-width:900px){.page-wrap{grid-template-columns:1fr;}}
  .main-col p{margin-bottom:14px;color:#2a2a2a;}
  .main-col ul{padding-left:20px;margin-bottom:14px;}
  .main-col ul li{margin-bottom:6px;}
  .section{margin-bottom:48px;}
  .section h2{font-size:1.55rem;color:var(--primary);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--gold);display:inline-block;}
  .section h3{font-size:1.1rem;color:var(--secondary);margin:20px 0 8px;}
  .delivery-box{background:var(--primary);color:var(--white);border-radius:12px;padding:28px;margin-bottom:32px;}
  .delivery-box h3{color:var(--gold);margin-bottom:14px;}
  .delivery-box p,.delivery-box li{color:rgba(255,255,255,.85);font-size:.93rem;}
  .delivery-box ul{padding-left:18px;}
  .delivery-box ul li{margin-bottom:6px;}
  .species-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:32px;}
  .species-card{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:16px;text-align:center;transition:box-shadow .2s;}
  .species-card:hover{box-shadow:var(--shadow);}
  .species-card .icon{font-size:1.8rem;margin-bottom:6px;}
  .species-card h4{font-size:.85rem;color:var(--primary);font-family:'Poppins',sans-serif;margin-bottom:3px;}
  .species-card span{font-size:.77rem;color:var(--muted);}
  .faq-item{border-bottom:1px solid var(--border);padding:18px 0;}
  .faq-item:last-child{border-bottom:none;}
  .faq-q{font-family:'Poppins',sans-serif;font-weight:700;font-size:1rem;color:var(--primary);margin-bottom:8px;}
  .faq-a{color:#2a2a2a;font-size:.95rem;}
  .cities-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:14px;}
  .city-chip{background:var(--white);border:1px solid var(--border);border-radius:8px;padding:10px;text-align:center;font-size:.83rem;color:var(--secondary);font-weight:600;transition:all .2s;display:block;}
  .city-chip:hover{background:var(--primary);color:var(--gold);border-color:var(--primary);}
  .cta-box{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:12px;padding:32px;color:var(--white);text-align:center;margin-bottom:32px;}
  .cta-box h3{color:var(--gold);font-size:1.15rem;margin-bottom:10px;}
  .cta-box p{color:rgba(255,255,255,.85);font-size:.9rem;margin-bottom:20px;}
  .btn-gold{display:inline-block;background:var(--gold);color:var(--primary);padding:12px 26px;border-radius:30px;font-weight:700;font-size:.92rem;transition:all .2s;}
  .btn-gold:hover{background:var(--gold-light);color:var(--primary);}
  .btn-outline{display:inline-block;border:2px solid rgba(255,255,255,.5);color:var(--white);padding:10px 22px;border-radius:30px;font-weight:600;font-size:.88rem;margin-left:10px;transition:all .2s;}
  .btn-outline:hover{border-color:var(--white);background:rgba(255,255,255,.1);color:var(--white);}
  .sidebar-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:22px;}
  .sidebar-card h4{font-family:'Poppins',sans-serif;color:var(--primary);font-size:.95rem;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--gold);}
  .sidebar-card ul{list-style:none;padding:0;}
  .sidebar-card ul li{padding:6px 0;border-bottom:1px solid var(--border);font-size:.86rem;}
  .sidebar-card ul li:last-child{border-bottom:none;}
  .sidebar-card ul li a{color:var(--secondary);}
  .delivery-badge{background:linear-gradient(135deg,var(--primary),var(--secondary));border-radius:12px;padding:20px;text-align:center;color:var(--white);margin-bottom:22px;}
  .delivery-badge .time{font-size:2.5rem;font-weight:800;color:var(--gold);font-family:'Poppins',sans-serif;}
  .delivery-badge p{font-size:.82rem;color:rgba(255,255,255,.75);margin-top:4px;}
  .process-steps{counter-reset:step;list-style:none;padding:0;}
  .process-steps li{counter-increment:step;display:flex;gap:16px;margin-bottom:20px;}
  .process-steps li::before{content:counter(step);background:var(--gold);color:var(--primary);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.9rem;flex-shrink:0;margin-top:2px;}
  .process-steps li strong{display:block;color:var(--primary);}
  .footer{background:var(--primary);color:rgba(255,255,255,.75);padding:56px 5% 32px;}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:32px;max-width:1200px;margin:0 auto 40px;}
  @media(max-width:820px){.footer-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:480px){.footer-grid{grid-template-columns:1fr;}}
  .footer-brand-name{font-family:'Poppins',sans-serif;font-size:1.1rem;font-weight:700;color:#fff;display:block;margin-bottom:.6rem;}
  .footer-tagline{font-size:.84rem;color:rgba(255,255,255,.55);line-height:1.55;margin-bottom:.7rem;}
  .footer-contact{font-size:.83rem;}
  .footer-contact a{color:var(--gold);}
  .footer-col h4{font-family:'Poppins',sans-serif;font-size:.72rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;}
  .footer-col ul{list-style:none;padding:0;}
  .footer-col ul li{margin-bottom:.5rem;}
  .footer-col ul li a{color:rgba(255,255,255,.8);font-size:.85rem;}
  .footer-col ul li a:hover{color:var(--gold);}
  .footer-bottom-bar{max-width:1200px;margin:0 auto;border-top:1px solid rgba(255,255,255,.12);padding-top:1.2rem;display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem;font-size:.78rem;color:rgba(255,255,255,.45);}
  </style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-inner">
      <a href="/fr/" class="logo"><span>🦜</span> paraisodeaves</a>
      <nav>
        <a href="/fr/perroquets-disponibles/">Oiseaux Disponibles</a>
        <a href="/fr/especies/">Espèces</a>
        <a href="/fr/adopter-perroquet/">Adoption</a>
        <a href="/fr/blog/">Blog</a>
        <a href="/fr/contact/">Contact</a>
      </nav>
    </div>
  </div>

  <div class="breadcrumb-bar">
    <div class="inner">
      <a href="/fr/">Accueil</a><span>›</span>
      <a href="/fr/">Villes</a><span>›</span>
      Perroquets à ${city.name}
    </div>
  </div>

  <div class="hero">
    <div class="badge">🚚 LIVRAISON À ${city.name.toUpperCase()}</div>
    <h1>${h1}</h1>
    <p class="subtitle">Perroquets élevés à la main en Espagne, livrés avec documentation CITES officielle en ${city.region}. Prix sur demande — réponse sous 24h.</p>
    <div class="trust-pills">
      <span>✅ CITES Officiel</span>
      <span>🐦 Élevés à la Main</span>
      <span>🚚 Livraison ${city.region}</span>
      <span>📋 Documentation Complète</span>
      <span>⭐ 25+ Ans d'Expérience</span>
    </div>
  </div>

  <div class="page-wrap">
    <main class="main-col">

      <div class="section">
        <h2>Perroquets à Vendre à ${city.name}</h2>
        <p>${city.localDetail}</p>
        <p>Paraíso de Aves est un élevage familial situé à Llíria, à 25 km de Valence (Espagne), avec plus de 25 ans d'expérience dans l'élevage de perroquets et d'oiseaux exotiques. Tous nos oiseaux sont élevés à la main, sevrés et socialisés avant d'être proposés à l'adoption. Nous livrons dans toute la France, y compris à ${city.name} et dans l'ensemble du département ${city.dept}, avec toute la documentation CITES officielle.</p>
        <p>Que vous recherchiez un <a href="/fr/especies/perroquet-gris-du-gabon/">Gris du Gabon</a> pour ses capacités intellectuelles extraordinaires, un <a href="/fr/especies/ara-bleu-et-jaune/">Ara Bleu et Jaune</a> pour sa présence spectaculaire, ou un <a href="/fr/especies/perroquet-du-senegal/">Perroquet du Sénégal</a> discret et affectueux, notre élevage dispose régulièrement d'oiseaux de qualité disponibles à la livraison. Consultez notre page <a href="/fr/perroquets-disponibles/">oiseaux disponibles</a> ou contactez-nous directement pour connaître les disponibilités du moment.</p>
      </div>

      <div class="section">
        <h2>Pourquoi les ${city.nameGentile} Choisissent Paraíso de Aves</h2>
        <p>Les clients de ${city.name} qui nous font confiance le font pour plusieurs raisons essentielles :</p>
        <ul>
          <li><strong>Documentation CITES irréprochable</strong> — Chaque oiseau est accompagné de son certificat CITES officiel, de son identification légale et d'un certificat de santé vétérinaire. Aucun oiseau ne part sans papiers complets.</li>
          <li><strong>Élevage à la main depuis le nid</strong> — Nos oiseaux grandissent avec un contact humain quotidien dès leur naissance. Ils arrivent chez vous confiants, manipulables et prêts à s'adapter à leur nouvelle famille.</li>
          <li><strong>Transparence totale</strong> — Avant toute décision, nous vous envoyons des photos et vidéos réelles de l'oiseau spécifique. Pas de photos génériques, pas de surprises à la livraison.</li>
          <li><strong>25 ans d'expérience</strong> — Fondé il y a plus de 25 ans, notre élevage est l'un des plus anciens et des plus reconnus d'Espagne pour les psittacidés.</li>
          <li><strong>Prix sur demande, sans pression</strong> — Nous ne pratiquons pas de vente en ligne avec panier. Chaque adoption est un échange personnalisé par email, sans engagement jusqu'à votre accord final.</li>
          <li><strong>Suivi post-adoption</strong> — Nous restons disponibles après la livraison pour répondre à vos questions sur l'alimentation, la cage, le comportement et les soins vétérinaires de votre oiseau.</li>
        </ul>
        <p>Pour en savoir plus sur notre philosophie d'élevage, visitez notre page <a href="/fr/eleveur-perroquets/">éleveur de perroquets</a> ou découvrez nos <a href="/fr/perroquets-eleves-a-la-main/">perroquets élevés à la main</a>.</p>
      </div>

      <div class="section">
        <h2>Espèces Disponibles pour Livraison à ${city.name}</h2>
        <p>Voici les principales espèces que nous élevons et livrons régulièrement à ${city.name}. Disponibilité variable selon les naissances — contactez-nous pour connaître les oiseaux actuellement disponibles.</p>
        <div class="species-grid">${speciesCards()}
        </div>
        <p>Découvrez tous nos guides d'espèces sur notre <a href="/fr/especies/">page espèces</a>. Vous pouvez aussi explorer notre <a href="/fr/blog/">blog</a> pour des conseils de choix et de soins.</p>
      </div>

      <div class="section">
        <h2>Transport Sécurisé jusqu'à ${city.name}</h2>
        <div class="delivery-box">
          <h3>🚚 Livraison à ${city.name} — ${city.distKm} km depuis Llíria</h3>
          <p>${city.transport}</p>
          <p style="margin-top:14px"><strong>Nos standards de transport :</strong></p>
          <ul>
            <li>Caisse de transport agréée, ventilée et sécurisée pour animaux vivants</li>
            <li>Nourriture et eau disponibles pendant tout le trajet</li>
            <li>Transporteur certifié pour les animaux vivants, conforme aux réglementations UE</li>
            <li>Suivi du transport en temps réel communiqué par email</li>
            <li>Remise en main propre à votre adresse à ${city.name}</li>
          </ul>
        </div>
        <p>Pour plus d'informations sur notre politique de livraison, consultez notre <a href="/fr/livraison/">page livraison</a>. Notre <a href="/fr/garantie-sante/">garantie santé</a> couvre chaque oiseau livré.</p>
      </div>

      <div class="section">
        <h2>CITES et Légalité à ${city.name}</h2>
        <p>La France applique strictement la réglementation CITES (Convention sur le Commerce International des Espèces de faune et de flore sauvages Menacées). Pour les ${city.nameGentile} souhaitant acquérir un perroquet exotique, voici ce qu'il faut savoir :</p>
        <ul>
          <li><strong>Annexe I (ex : Ara Hyacinthe, Ara Macao)</strong> — Commerce strictement réglementé. Certificats CITES obligatoires des deux côtés (vendeur et acheteur). Chez Paraíso de Aves, tous nos oiseaux Annexe I sont nés en captivité et possèdent l'intégralité des documents légaux.</li>
          <li><strong>Annexe II (ex : Gris du Gabon, Ara Bleu, Cacatoès)</strong> — Commerce possible sous conditions documentaires. Certificat CITES du pays d'origine obligatoire. Nous vous fournissons systématiquement ce document.</li>
          <li><strong>Identification officielle obligatoire</strong> — Tout oiseau doit être bagué ou muni d'un transpondeur. Nos oiseaux sont identifiés dès leur naissance.</li>
          <li><strong>Transport UE sans douanes</strong> — L'Espagne et la France étant toutes deux membres de l'UE, aucun droit de douane ne s'applique. Seule la documentation CITES est requise.</li>
        </ul>
        <p>Pour une information complète sur la réglementation, consultez notre <a href="/fr/blog/guide-cites-france/">guide CITES France</a> ou la page officielle du Ministère de la Transition Écologique.</p>
      </div>

      <div class="section">
        <h2>Processus d'Achat depuis ${city.name}</h2>
        <ol class="process-steps">
          <li><strong>Contact par email</strong> Écrivez à <a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a> en indiquant l'espèce souhaitée, votre budget et votre département (${city.dept} — ${city.region}).</li>
          <li><strong>Présentation de l'oiseau disponible</strong> Nous vous envoyons photos réelles, vidéos et toutes les informations sur l'oiseau disponible correspondant à votre demande.</li>
          <li><strong>Devis complet</strong> Vous recevez le prix de l'oiseau, les frais de transport jusqu'à ${city.name} et la liste des documents fournis. Aucun engagement à ce stade.</li>
          <li><strong>Réservation et acompte</strong> Si vous souhaitez réserver l'oiseau, un acompte est demandé pour bloquer l'animal. Détails sur notre <a href="/fr/processus-adoption/">page adoption</a>.</li>
          <li><strong>Organisation du transport</strong> Nous planifions la livraison à ${city.name} avec nos partenaires certifiés transport d'animaux vivants.</li>
          <li><strong>Réception et documentation</strong> Vous recevez l'oiseau à votre adresse à ${city.name} avec tous ses documents CITES, son certificat de santé et un guide de soins.</li>
        </ol>
        <p>Pour toute question sur le processus, consultez notre <a href="/fr/faq/">FAQ</a> ou notre page <a href="/fr/adopter-perroquet/">adopter un perroquet</a>.</p>
      </div>

      <div class="section">
        <h2>Réservation et Acompte</h2>
        <p>Pour réserver un oiseau en vue d'une livraison à ${city.name}, la procédure est simple et transparente :</p>
        <ul>
          <li>Un acompte est demandé pour réserver l'oiseau et bloquer sa disponibilité. Son montant est précisé dans votre devis personnalisé.</li>
          <li>Le solde est réglé avant l'expédition, une fois que vous avez confirmé votre accord sur l'oiseau (photos/vidéos vérifiées).</li>
          <li>En cas d'impossibilité de livraison de notre côté, l'acompte est intégralement remboursé.</li>
          <li>Nous n'expédions jamais un oiseau sans votre accord explicite sur les photos et vidéos reçues.</li>
        </ul>
        <p>Notre <a href="/fr/garantie-sante/">garantie santé</a> couvre les 15 premiers jours suivant la livraison pour toute maladie préexistante non déclarée. Pour les détails complets, consultez notre <a href="/fr/processus-adoption/">processus d'adoption</a>.</p>
      </div>

      <div class="section">
        <h2>Livraison à Domicile à ${city.name}</h2>
        <p>La livraison de votre perroquet à ${city.name} est organisée en plusieurs étapes pour garantir le confort et la sécurité de l'oiseau :</p>
        <ul>
          <li><strong>J-3 à J-1 :</strong> Confirmation de la date et de l'heure de livraison par email ou SMS.</li>
          <li><strong>Jour J :</strong> L'oiseau part de notre élevage de Llíria dans sa caisse de transport agréée. Vous recevez un numéro de suivi.</li>
          <li><strong>Remise :</strong> Le transporteur livre l'oiseau à votre adresse à ${city.name}. Votre présence est requise pour la remise en main propre.</li>
          <li><strong>Documentation :</strong> Vous recevez physiquement les documents CITES, le certificat de santé et le guide de soins au moment de la livraison.</li>
          <li><strong>Suivi :</strong> Nous vous contactons dans les 48h pour nous assurer que l'oiseau s'est bien adapté.</li>
        </ul>
      </div>

      <div class="section">
        <h2>Questions Fréquentes sur la Livraison à ${city.name}</h2>
        ${faqHtml}
      </div>

      <div class="cta-box">
        <h3>${city.cityCTA}</h3>
        <p>Contactez-nous dès aujourd'hui pour vérifier la disponibilité des espèces et recevoir un devis personnalisé avec livraison directe à ${city.name} (${city.dept}).</p>
        <a href="mailto:paraisodeloros@gmail.com" class="btn-gold">📧 Envoyer un Email</a>
        <a href="/fr/contact/" class="btn-outline">Formulaire de Contact</a>
      </div>

      <div class="section">
        <h2>Livraisons dans d'Autres Villes de France</h2>
        <div class="cities-grid">
          ${otherCities}
        </div>
        <p style="margin-top:16px">Nous livrons dans <strong>50 villes</strong> à travers toute la France. Si votre ville ne figure pas dans la liste, contactez-nous — nous étudions chaque demande individuellement.</p>
      </div>

    </main>

    <aside class="sidebar">
      <div class="delivery-badge">
        <div style="font-size:.78rem;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Livraison à ${city.name}</div>
        <div class="time">2–4</div>
        <p>jours ouvrés après confirmation</p>
      </div>

      <div class="sidebar-card" id="contact">
        <h4>📋 Demander des informations</h4>
        <p style="font-size:.82rem;color:var(--muted);margin-bottom:14px;">Réponse sous 24h.</p>
        <p style="font-size:.86rem;margin-bottom:12px;">Écrivez-nous à :<br/><a href="mailto:paraisodeloros@gmail.com" style="color:var(--primary);font-weight:700;">paraisodeloros@gmail.com</a></p>
        <p style="font-size:.82rem;color:var(--muted);">Indiquez l'espèce souhaitée, votre département (${city.dept}) et votre budget.</p>
        <a href="mailto:paraisodeloros@gmail.com" class="btn-gold" style="display:block;text-align:center;margin-top:14px;">Envoyer un Email</a>
        <a href="/fr/contact/" style="display:block;text-align:center;margin-top:8px;font-size:.84rem;color:var(--secondary);">Formulaire de contact →</a>
      </div>

      <div class="sidebar-card">
        <h4>Espèces Disponibles</h4>
        <ul>
          ${speciesSidebarLinks()}
          <li><a href="/fr/especies/">Voir toutes les espèces →</a></li>
        </ul>
      </div>

      <div class="sidebar-card">
        <h4>Liens Utiles</h4>
        <ul>
          <li><a href="/fr/perroquets-disponibles/">Oiseaux Disponibles</a></li>
          <li><a href="/fr/adopter-perroquet/">Processus d'Adoption</a></li>
          <li><a href="/fr/livraison/">Livraison en France</a></li>
          <li><a href="/fr/garantie-sante/">Garantie Santé</a></li>
          <li><a href="/fr/blog/guide-cites-france/">Guide CITES France</a></li>
          <li><a href="/fr/blog/prix-perroquet-france/">Prix en France</a></li>
          <li><a href="/fr/blog/quel-perroquet-choisir/">Quel Perroquet?</a></li>
        </ul>
      </div>

      <div class="sidebar-card">
        <h4>Nos Guides de Prix</h4>
        <ul>
          <li><a href="/fr/acheter-ara/">Guide Prix Aras</a></li>
          <li><a href="/fr/acheter-gris-du-gabon/">Guide Gris du Gabon</a></li>
          <li><a href="/fr/faq/">FAQ Générale</a></li>
        </ul>
      </div>
    </aside>
  </div>

  <footer class="footer">
    <div class="footer-grid">
      <div>
        <span class="footer-brand-name">🦜 paraisodeaves</span>
        <p class="footer-tagline">Élevage légal de perroquets et oiseaux exotiques à Llíria, Valence (Espagne). Plus de 25 ans d'expérience. Livraison CITES dans toute la France.</p>
        <p class="footer-contact">✉ <a href="mailto:paraisodeloros@gmail.com">paraisodeloros@gmail.com</a></p>
      </div>
      <div class="footer-col"><h4>Nos Oiseaux</h4><ul>
        <li><a href="/fr/especies/perroquet-gris-du-gabon/">Gris du Gabon</a></li>
        <li><a href="/fr/especies/ara-bleu-et-jaune/">Ara Bleu et Jaune</a></li>
        <li><a href="/fr/especies/cacatoes-huppe-jaune/">Cacatoès</a></li>
        <li><a href="/fr/especies/amazone-front-bleu/">Amazones</a></li>
        <li><a href="/fr/perroquets-disponibles/">Voir tous les oiseaux</a></li>
      </ul></div>
      <div class="footer-col"><h4>Villes</h4><ul>
        <li><a href="/fr/perroquets-a-vendre-paris/">Paris</a></li>
        <li><a href="/fr/perroquets-a-vendre-lyon/">Lyon</a></li>
        <li><a href="/fr/perroquets-a-vendre-marseille/">Marseille</a></li>
        <li><a href="/fr/perroquets-a-vendre-bordeaux/">Bordeaux</a></li>
        <li><a href="/fr/perroquets-a-vendre-toulouse/">Toulouse</a></li>
      </ul></div>
      <div class="footer-col"><h4>Information</h4><ul>
        <li><a href="/fr/a-propos/">À propos</a></li>
        <li><a href="/fr/adopter-perroquet/">Adoption</a></li>
        <li><a href="/fr/livraison/">Livraison</a></li>
        <li><a href="/fr/garantie-sante/">Garantie Santé</a></li>
      </ul></div>
      <div class="footer-col"><h4>Ressources</h4><ul>
        <li><a href="/fr/blog/">Blog</a></li>
        <li><a href="/fr/faq/">FAQ</a></li>
        <li><a href="/fr/especies/">Espèces</a></li>
        <li><a href="/fr/contact/">Contact</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom-bar">
      <span>© 2026 paraisodeaves · Llíria, Valencia, España</span>
      <div style="display:flex;gap:1rem">
        <a href="https://www.paraisodeaves.com/" style="color:rgba(255,255,255,.6)">ES</a>
        <a href="https://www.paraisodeaves.com/pt/" style="color:rgba(255,255,255,.6)">PT</a>
        <a href="https://www.paraisodeaves.com/fr/" style="color:var(--gold)">FR</a>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// ─── WRITE ALL FILES ──────────────────────────────────────────────────────────
let created = 0, updated = 0;
const generated = [];

for (const city of CITIES) {
  const dir = `fr/perroquets-a-vendre-${city.slug}`;
  const file = path.join(dir, 'index.html');
  const exists = fs.existsSync(file);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, generatePage(city), 'utf8');
  generated.push(`https://www.paraisodeaves.com/fr/perroquets-a-vendre-${city.slug}/`);
  if (exists) { updated++; console.log(`  UPDATED: ${dir}/index.html`); }
  else         { created++; console.log(`  CREATED: ${dir}/index.html`); }
}

// ─── UPDATE SITEMAP_FR.XML ────────────────────────────────────────────────────
let sitemap = fs.readFileSync('sitemap_fr.xml', 'utf8');
// Remove old city entries
const cityPattern = /<url><loc>https:\/\/www\.paraisodeaves\.com\/fr\/perroquets-a-vendre-[^<]+<\/loc>[^<]*<lastmod>[^<]*<\/lastmod>[^<]*<changefreq>[^<]*<\/changefreq>[^<]*<priority>[^<]*<\/priority><\/url>/g;
sitemap = sitemap.replace(cityPattern, '').replace(/\n\n+/g, '\n');

// Add fresh city entries before </urlset>
const newCityUrls = CITIES.map(c =>
  `  <url><loc>https://www.paraisodeaves.com/fr/perroquets-a-vendre-${c.slug}/</loc><lastmod>2026-07-12</lastmod><changefreq>monthly</changefreq><priority>0.82</priority></url>`
).join('\n');

sitemap = sitemap.replace('</urlset>', `  <!-- 50 city pages added/updated 2026-07-12 -->\n${newCityUrls}\n</urlset>`);
fs.writeFileSync('sitemap_fr.xml', sitemap, 'utf8');

// ─── REPORT ───────────────────────────────────────────────────────────────────
console.log(`\n✅ Done: ${created} created, ${updated} updated`);
console.log(`📄 Total pages: ${CITIES.length}`);
console.log(`🗺  Sitemap updated: sitemap_fr.xml`);
console.log('\n── DEPLOYMENT REPORT ──────────────────────────────────────────');
generated.forEach(u => console.log(` • ${u}`));
