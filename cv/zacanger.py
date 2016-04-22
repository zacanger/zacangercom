#!/usr/bin/env python2

from datetime import datetime
from collections import namedtuple


NAME = "Zac Anger"
EMAIL = "zac@zacanger.com"


class JobMixin(object):

    def __repr__(self):
        return "{0} - {1}, {2}, {3}, {4}\n{5}\n{6}".format(
            self.started.strftime("%B %Y"),
            self.left if isinstance(self.left, str) else self.left.strftime("%B %Y"),
            self.company,
            self.location,
            self.title,
            "\n".join(self.description),
            "=" * 20
        )


# Experience

class DevMountain(JobMixin):
    company = "DevMountain"
    location = "Provo, UT"
    title = "Mentor & Junior Developer"
    started = datetime(2016, 2, 1)
    left = datetime(2016, 6, 1)
    description = [
        "Mentored group of new developers; planned and carried out lectures",
        "Curriculum maintenance and prep; discussion and toy-problem leading.",
        "Internal DevMountain projects.",
        "Used Node, Express, Angular, Chromium (extensions), CSS and preprocessors,",
        "MongoDB and Mongoose, MySQL, build systems, and Linux servers."
    ]


class Mickeys(JobMixin):
    company = "Mickey's Pizza"
    location = "York, PA"
    title = "Web Development & Design"
    started = datetime(2014, 9, 1)
    left = datetime(2015, 9, 20)
    description = [
        "Full revamp of wholesale foods company web presence.",
        "Design, front-end development, and deployment."
    ]


class Music(JobMixin):
    company = "Menchey Music & RLH Guitars"
    location = "PA"
    title = "Sales,  Venue Management"
    started = datetime(2005, 12, 1)
    left = datetime(2008, 7, 1)
    description = [
        "Lead combo sales",
        "Mix Engineer",
        "Recording engineer",
        "Live sound engineer",
        "Guitar teacher",
        "Drum teacher",
        "Venue management",
        "Guitar repairs",
        "Custom drumset builds"
    ]


class SchoolMixin(object):

    def __repr__(self):
        return "{0} - {1}, {2}, {3}, {4}\n{5}\n{6}".format(
            self.started.strftime("%B %Y"),
            self.left if isinstance(self.left, str) else self.left.strftime("%B %Y"),
            self.name,
            self.location,
            self.course,
            "\n".join(self.description),
            "=" * 20
        )

# Education
class Devmtn(SchoolMixin):
    name = "DevMountain"
    location = "Provo, UT"
    course = "Full-time Immersive Javascript Development Course"
    started = datetime(2015, 10, 13)
    left = datetime(2016, 1, 22)
    description = [
        "An intensive bootcamp-style course on Javascript.",
        "Strong focus on the MEAN stack.",
        "Built several front- and back-end projects, solo and in groups.",
        "Designed and developed production-ready full-stack applications and services."
    ]

class Home(SchoolMixin):
    name = "Homeschool"
    location = "Brogue, PA"
    course = "Music Recording Technology"
    started = datetime(2004, 8, 1)
    left = datetime(2007, 2, 1)
    description = [
        "Focused primarily on music, audio technology, medieval history, and feeling like a hacker."
    ]


Link = namedtuple("Link", "title url")


if __name__ == "__main__":
    experience = [DevMountain(), Mickeys(), Music()]
    print NAME
    print EMAIL

    print "\nSummary: Web enthusiast, professional musician, FOSS supporter, nix nerd, Node geek.\n"
    print "Languages: Javascript (React, Node, ES7, Angular, jQuery, and even vanilla!), Bash, HTML, CSS.\n"
    print "Technologies: Git, CSS preprocessors, build systems.\n"
    print "Learning: Python, C, Functional Reactive Programming, Go, Ruby, Haskell."

    print "\nExperience:"
    for exp in experience:
        print exp

    print "\nEducation:"
    eduction = [Devmtn(), Home()]
    for edu in eduction:
        print edu

    print "\nLinks:"
    links = [
        Link("zacanger.com", "http://zacanger.com"),
        Link("Blog", "http://zacanger.com/blog"),
        Link("NPM", "https://npmjs.org/~zacanger"),
        Link("Github", "https://github.com/zacanger"),
        Link("Twitter", "https://twitter.com/@zacanger"),
        Link("Bandcamp", "http://zacanger.bandcamp.com"),
        Link("Soundcloud", "http://soundcloud.com/zacanger"),
        Link("LinkedIn", "https://www.linkedin.com/in/zacanger")
      ]
    for li in links:
        print li

